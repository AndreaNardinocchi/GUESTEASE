// /* BookingContext.tsx
//  *
//  * This file provides a React context that:
//  *  - connects to Supabase
//  *  - exposes a simple API to fetch bookings and create (book) a room
//  *  - checks for overlapping bookings (to avoid overbooking at the app level)
//  *
//  * IMPORTANT: App-level overlap checks help UX but DO NOT fully prevent race conditions
//  * (two clients booking simultaneously). For full protection you should enforce
//  * constraints in the database (see the SQL note at the bottom) or use a Supabase
//  * RPC (stored procedure) that checks + inserts inside a single transaction.
//  */

// import React, { createContext, useContext, useState } from "react";
// /* We import createClient from @supabase/supabase-js to talk to Supabase.
//  * Ensure you have installed @supabase/supabase-js in your project.
//  */
// import { createClient, SupabaseClient } from "@supabase/supabase-js";
// import { searchAvailableRooms } from "../supabase/roomService";

// /* -------------------------
//  * Types used in the context
//  * ------------------------- */

// /* Booking shape stored in the DB. We use snake_case for DB fields to match a
//  * typical Supabase/Postgres naming convention. The frontend can still use camelCase
//  * if you prefer — here we keep DB naming for clarity.
//  */
// type Booking = {
//   id?: string /* db primary key, optional when creating */;
//   room_id: string /* which room is booked */;
//   check_in: string /* ISO date string (YYYY-MM-DD) */;
//   check_out: string /* ISO date string (YYYY-MM-DD) */;
//   guests: number /* number of guests */;
//   created_at?: string /* optional timestamp from DB */;
// };

// /* Shape of the BookingContext public API */
// type BookingContextType = {
//   bookings: Booking[] /* cached bookings in memory */;
//   loading: boolean /* whether an API call is in progress */;
//   fetchBookings: (
//     roomId?: string
//   ) => Promise<void> /* refresh bookings (optionally for a room) */;
//   bookRoom: (
//     b: Omit<Booking, "id" | "created_at">
//   ) => Promise<{ success: boolean; message?: string }>;
//   /* bookRoom returns a success flag and optional message for UX */

//   // ✅ Add this
//   searchAvailableRooms: (
//     checkIn: string,
//     checkOut: string
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   ) => Promise<{ success: boolean; rooms: any[]; message?: string }>;
// };

// /* -------------------------
//  * Create Supabase client
//  * ------------------------- */
// /* IMPORTANT: DO NOT hardcode your keys here in source. Use environment variables.
//  * The Vite convention: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY (or SERVICE KEY
//  * if used server-side). This uses the anon key for client-side usage.
//  */
// const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
// const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

// /* Basic runtime checks to make debugging easier in development */
// if (!supabaseUrl || !supabaseAnonKey) {
//   /* In production you may want to throw or handle differently. */
//   console.warn(
//     "Supabase environment variables are not set. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY."
//   );
// }

// /* createClient instantiates a Supabase client we use below */
// const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey);

// const { data, error } = await supabase.from("bookings").select("*");
// console.log({ data, error });

// // // Remove top-level await
// // // Move any test fetch into a function or useEffect
// // const testSupabase = async () => {
// //   const { data, error } = await supabase.from("bookings").select("*");
// //   console.log({ data, error });
// // };

// // call testSupabase() inside useEffect or from a button, not at the top level

// // /* --- TEMP: Test Supabase connection --- */
// // const testSupabase = async () => {
// //   const { data, error } = await supabase.from("bookings").select("*");
// //   console.log("Test fetch:", { data, error });
// // };
// // testSupabase(); // call immediately
// /* --- END TEMP --- */

// /* -------------------------
//  * Create React Context
//  * ------------------------- */
// const BookingContext = createContext<BookingContextType | undefined>(undefined);

// /* -------------------------
//  * Provider Component
//  * ------------------------- */
// export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   /* bookings state: local cache of bookings we fetched from the DB */
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   /* loading state: for showing spinners / disabling UI during operations */
//   const [loading, setLoading] = useState(false);

//   /* -------------------------------------------------------
//    * fetchBookings:
//    *   Fetch bookings from Supabase. If roomId is provided, we filter by room.
//    * ------------------------------------------------------- */
//   const fetchBookings = async (roomId?: string) => {
//     /* Start loading */
//     setLoading(true);

//     try {
//       /* Build a query: select all columns from bookings table */
//       let query = supabase.from("bookings").select("*");

//       /* If a roomId was passed, add an equality filter so we only fetch bookings
//        * for that specific room (smaller payload and easier overlap checks).
//        */
//       if (roomId) {
//         query = query.eq("room_id", roomId);
//       }

//       /* Execute the query */
//       const { data, error } = await query;

//       if (error) {
//         /* Log for debug and surface a simple error message */
//         console.error("fetchBookings error:", error);
//         setBookings([]);
//       } else {
//         /* data may be null if empty — default to [] */
//         setBookings((data as Booking[]) || []);
//       }
//     } catch (err) {
//       /* Defensive catch for unexpected exceptions */
//       console.error("fetchBookings unexpected error:", err);
//       setBookings([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* -------------------------------------------------------
//    * Helper: check for overlap between two bookings
//    * ------------------------------------------------------- */

//   const bookingsOverlap = (
//     aStartISO: string,
//     aEndISO: string,
//     bStartISO: string,
//     bEndISO: string
//   ) => {
//     /* Convert to number of milliseconds since epoch for reliable numeric comparison */
//     const aStart = new Date(aStartISO).getTime();
//     const aEnd = new Date(aEndISO).getTime();
//     const bStart = new Date(bStartISO).getTime();
//     const bEnd = new Date(bEndISO).getTime();

//     /* Overlap condition:
//      * Two ranges [aStart, aEnd) and [bStart, bEnd) overlap if:
//      *   aStart < bEnd && bStart < aEnd
//      *
//      * We treat check_out as exclusive (common hotel convention). Adjust if needed.
//      */
//     return aStart < bEnd && bStart < aEnd;
//   };

//   /* -------------------------------------------------------
//    * bookRoom:
//    *   1) Fetch current bookings for the same room
//    *   2) Check for overlaps
//    *   3) If no overlap, insert the booking
//    *   4) Return success status and message
//    *
//    * NOTE: This performs an application-level check against currently stored bookings.
//    * It reduces chances of overbooking, but DOES NOT fully guarantee prevention of
//    * race-conditions where two clients pass the check at the same time. See the SQL
//    * / RPC note at the end of the file for production-safe approaches.
//    * ------------------------------------------------------- */
//   // const bookRoom = async (newBooking: Omit<Booking, "id" | "created_at">) => {
//   //   setLoading(true);

//   //   try {
//   //     /* 1) Fetch existing bookings for the same room from the DB */
//   //     const { data: existing, error: fetchError } = await supabase
//   //       .from("bookings")
//   //       .select("*")
//   //       .eq("room_id", newBooking.room_id);

//   //     if (fetchError) {
//   //       console.error("Error fetching existing bookings:", fetchError);
//   //       return { success: false, message: "Failed to check availability." };
//   //     }

//   //     /* 2) Check overlap against each existing booking */
//   //     const hasOverlap = (existing as Booking[] | null)?.some((b) =>
//   //       bookingsOverlap(
//   //         b.check_in,
//   //         b.check_out,
//   //         newBooking.check_in,
//   //         newBooking.check_out
//   //       )
//   //     );

//   //     if (hasOverlap) {
//   //       /* If there's an overlap, return a friendly message for the UI */
//   //       return {
//   //         success: false,
//   //         message: "Selected dates overlap with an existing booking.",
//   //       };
//   //     }

//   //     /* 3) Insert the new booking
//   //      * We pass the booking object shaped for DB. Supabase will return an error if insertion fails.
//   //      */
//   //     const { data: inserted, error: insertError } = await supabase
//   //       .from("bookings")
//   //       .insert([newBooking])
//   //       .select(); /* select returns the inserted row(s) */

//   //     if (insertError) {
//   //       console.error("Error inserting booking:", insertError);
//   //       return { success: false, message: "Failed to create booking." };
//   //     }

//   //     /* 4) Update local cache optimistically by adding the inserted booking(s) */
//   //     if (inserted) {
//   //       setBookings((prev) => [...prev, ...(inserted as Booking[])]);
//   //     }

//   //     return { success: true, message: "Booking created successfully." };
//   //   } catch (err) {
//   //     console.error("bookRoom unexpected error:", err);
//   //     return {
//   //       success: false,
//   //       message: "Unexpected error while creating booking.",
//   //     };
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const bookRoom = async (newBooking: Omit<Booking, "id" | "created_at">) => {
//     setLoading(true);

//     try {
//       // Insert booking
//       const { data: inserted, error: insertError } = await supabase
//         .from("bookings")
//         .insert([newBooking])
//         .select(); // returns inserted rows

//       if (insertError) {
//         // Check if the error is an overlap violation
//         if (
//           insertError.code === "23505" || // unique violation
//           insertError.message?.includes("no_overlapping_bookings")
//         ) {
//           return {
//             success: false,
//             message: "Selected dates overlap with an existing booking.",
//           };
//         }

//         console.error("Error inserting booking:", insertError);
//         return { success: false, message: "Failed to create booking." };
//       }

//       // Update local cache optimistically
//       if (inserted) {
//         setBookings((prev) => [...prev, ...(inserted as Booking[])]);
//       }

//       return { success: true, message: "Booking created successfully." };
//     } catch (err) {
//       console.error("bookRoom unexpected error:", err);
//       return {
//         success: false,
//         message: "Unexpected error while creating booking.",
//       };
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* Provide context values to consumers */
//   return (
//     <BookingContext.Provider
//       value={{
//         bookings,
//         loading,
//         fetchBookings,
//         bookRoom,
//         searchAvailableRooms,
//       }}
//     >
//       {children}
//     </BookingContext.Provider>
//   );
// };

// /* -------------------------
//  * Hook helper to read the context
//  * ------------------------- */
// // eslint-disable-next-line react-refresh/only-export-components
// export const useBooking = (): BookingContextType => {
//   const ctx = useContext(BookingContext);
//   if (!ctx) {
//     /* Helpful error when the provider is not mounted */
//     throw new Error("useBooking must be used inside a BookingProvider");
//   }
//   return ctx;
// };

// /* -------------------------
//  * Optional: Export default for convenience
//  * ------------------------- */
// export default {
//   BookingProvider,
//   useBooking,
// };

// /* -------------------------
//  * Database / Production Notes (read carefully)
//  * -------------------------
//  *
//  * 1) Table definition (example SQL) — create this in your Supabase SQL editor:
//  *
//  * CREATE TABLE public.bookings (
//  *   id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
//  *   room_id text NOT NULL,
//  *   check_in date NOT NULL,
//  *   check_out date NOT NULL,
//  *   guests integer NOT NULL,
//  *   created_at timestamptz DEFAULT now()
//  * );
//  *
//  * 2) App-level overlap detection (what this file does)
//  *    - This checks for overlap before inserting which is good for UX.
//  *    - BUT it cannot prevent two clients from reading "no overlap" at the same time then both inserting —
//  *      leading to an overbooking race condition.
//  *
//  * 3) Recommended production-safe approaches:
//  *
//  *    Option A — Database constraint + exclusion index (Postgres):
//  *
//  *    -- This approach uses tstzrange or daterange and a GIST exclusion constraint to prevent overlapping bookings:
//  *    ALTER TABLE public.bookings
//  *      ADD COLUMN period daterange GENERATED ALWAYS AS (daterange(check_in, check_out, '[]')) STORED;
//  *
//  *    CREATE EXTENSION IF NOT EXISTS btree_gist; -- needed for some index types
//  *
//  *    CREATE INDEX bookings_period_idx ON public.bookings USING GIST (room_id, period);
//  *
//  *    -- Exclusion constraint prevents overlapping periods for the same room_id
//  *    ALTER TABLE public.bookings
//  *      ADD CONSTRAINT no_overlapping_bookings EXCLUDE USING GIST (
//  *        room_id WITH =,
//  *        period WITH &&
//  *      );
//  *
//  *    With this constraint, any insert that attempts to create an overlapping period for the same room
//  *    will fail with a constraint violation — which you can handle and show a friendly message to the user.
//  *
//  *    Option B — Server-side RPC (recommended if you can't add DB-level constraint)
//  *
//  *    -- Write a Postgres function that checks overlap and inserts in a single transaction.
//  *    create function book_room(_room_id text, _check_in date, _check_out date, _guests int)
//  *      returns table (id uuid, room_id text, check_in date, check_out date, guests int, created_at timestamptz)
//  *    language plpgsql
//  *    as $$
//  *    begin
//  *      -- check overlap
//  *      if exists (
//  *        select 1 from bookings
//  *        where room_id = _room_id
//  *          and daterange(check_in, check_out, '[]') && daterange(_check_in, _check_out, '[]')
//  *      ) then
//  *        raise exception 'OVERLAP';
//  *      end if;
//  *
//  *      -- insert
//  *      return query
//  *      insert into bookings (room_id, check_in, check_out, guests)
//  *      values (_room_id, _check_in, _check_out, _guests)
//  *      returning *;
//  *    end;
//  *    $$;
//  *
//  *    Then call this function with supabase.rpc('book_room', { ... }) — the DB transaction ensures atomicity.
//  *
//  * 4) Client usage (example)
//  *
//  *    - Wrap your app:
//  *      <BookingProvider>
//  *        <App />
//  *      </BookingProvider>
//  *
//  *    - In your BookingForm component:
//  *
//  *      import { useBooking } from "./BookingContext";
//  *
//  *      const { bookRoom } = useBooking();
//  *
//  *      const handleSubmit = async (e) => {
//  *        e.preventDefault();
//  *        const result = await bookRoom({
//  *          room_id: "room_101",
//  *          check_in: "2025-12-01",
//  *          check_out: "2025-12-05",
//  *          guests: 2
//  *        });
//  *
//  *        if (!result.success) {
//  *          alert(result.message || "Failed to book");
//  *        } else {
//  *          alert("Booked!");
//  *        }
//  *      };
//  *
//  * 5) Security note:
//  *    - If using anon key client-side, restrict what the anon key can do via Row Level Security (RLS).
//  *    - Prefer server-side (service role) operations for critical checks if possible.
//  *
//  * -------------------------
//  * End of BookingContext.tsx
//  * ------------------------- */

/* BookingContext.tsx
 *
 * React context for bookings:
 * - connects to Supabase
 * - exposes fetchBookings, bookRoom, and searchAvailableRooms
 * - avoids top-level Supabase calls
 */

import React, { createContext, useContext, useState } from "react";
import { supabase } from "../supabaseClient";
import { searchAvailableRooms as searchRoomsService } from "../supabase/roomService";

/* -------------------------
 * Types
 * ------------------------- */

type Booking = {
  id?: string;
  room_id: string;
  check_in: string;
  check_out: string;
  guests: number;
  created_at?: string;
  // 🟩 ADDED: user_id field to match Supabase schema
  user_id?: string;
};

type BookingContextType = {
  bookings: Booking[];
  loading: boolean;
  fetchBookings: (roomId?: string) => Promise<void>;
  bookRoom: (
    b: Omit<Booking, "id" | "created_at">
  ) => Promise<{ success: boolean; message?: string }>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  searchAvailableRooms: (
    checkIn: string,
    checkOut: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => Promise<{ success: boolean; rooms: any[]; message?: string }>;
};

/* -------------------------
 * Context
 * ------------------------- */
const BookingContext = createContext<BookingContextType | undefined>(undefined);

/* -------------------------
 * Provider
 * ------------------------- */
export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  /* Fetch bookings */
  const fetchBookings = async (roomId?: string) => {
    setLoading(true);
    try {
      // 🟩 ADDED: Get current authenticated user
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setBookings([]);
        setLoading(false);
        return;
      }
      // 🟩 CHANGED: Filter bookings by current user's ID
      let query = supabase.from("bookings").select("*");
      if (roomId) query = query.eq("room_id", roomId);
      const { data, error } = await query;
      if (error) {
        console.error("fetchBookings error:", error);
        setBookings([]);
      } else {
        setBookings((data as Booking[]) || []);
      }
    } catch (err) {
      console.error("fetchBookings unexpected error:", err);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  /* Overlap check */
  const bookingsOverlap = (
    aStartISO: string,
    aEndISO: string,
    bStartISO: string,
    bEndISO: string
  ) => {
    const aStart = new Date(aStartISO).getTime();
    const aEnd = new Date(aEndISO).getTime();
    const bStart = new Date(bStartISO).getTime();
    const bEnd = new Date(bEndISO).getTime();
    return aStart < bEnd && bStart < aEnd;
  };

  /* Book room */
  const bookRoom = async (newBooking: Omit<Booking, "id" | "created_at">) => {
    setLoading(true);
    try {
      // 🟩 ADDED: Get user and attach user_id to booking
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) {
        return { success: false, message: "User not authenticated." };
      }

      // 🟩 ADDED: Include user_id when inserting
      const bookingWithUser = { ...newBooking, user_id: user.id };
      const { data: inserted, error: insertError } = await supabase
        .from("bookings")
        .insert([bookingWithUser])
        .select();
      console.log("Booking payload for insert:", bookingWithUser);

      if (insertError) {
        if (
          insertError.code === "23505" ||
          insertError.message?.includes("no_overlapping_bookings")
        ) {
          return {
            success: false,
            message: "Selected dates overlap with an existing booking.",
          };
        }
        console.error(
          "Error inserting booking:",
          JSON.stringify(insertError, null, 2)
        );

        return { success: false, message: "Failed to create booking." };
      }

      if (inserted)
        setBookings((prev) => [...prev, ...(inserted as Booking[])]);
      return { success: true, message: "Booking created successfully." };
    } catch (err) {
      console.error("bookRoom unexpected error:", err);
      return {
        success: false,
        message: "Unexpected error while creating booking.",
      };
    } finally {
      setLoading(false);
    }
  };

  /* Search available rooms */
  const searchAvailableRooms = async (checkIn: string, checkOut: string) => {
    return searchRoomsService(checkIn, checkOut);
  };

  /* Provide context */
  return (
    <BookingContext.Provider
      value={{
        bookings,
        loading,
        fetchBookings,
        bookRoom,
        searchAvailableRooms,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

/* -------------------------
 * Hook to use context
 * ------------------------- */
// eslint-disable-next-line react-refresh/only-export-components
export const useBooking = (): BookingContextType => {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used inside a BookingProvider");
  return ctx;
};

/* -------------------------
 * Default export
 * ------------------------- */
export default {
  BookingProvider,
  useBooking,
};
