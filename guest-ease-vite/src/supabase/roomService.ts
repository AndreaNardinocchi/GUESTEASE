// // src/supabase/roomService.ts
// import { supabase } from "../supabaseClient";

// /**
//  * Search for rooms available between checkIn and checkOut
//  */
// export const searchAvailableRooms = async (
//   checkIn: string,
//   checkOut: string
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
// ): Promise<{ success: boolean; rooms: any[]; message?: string }> => {
//   try {
//     // Step 1: Fetch all rooms
//     const { data: allRooms, error: roomError } = await supabase
//       .from("rooms")
//       .select("*");

//     if (roomError) {
//       console.error("Error fetching rooms:", roomError);
//       return { success: false, rooms: [], message: "Failed to fetch rooms" };
//     }

//     // Step 2: Fetch all overlapping bookings
//     const { data: bookedRooms, error: bookingError } = await supabase
//       .from("bookings")
//       .select("room_id, check_in, check_out")
//       .or(
//         // Find any booking that overlaps with [checkIn, checkOut]
//         `and(check_in <= ${checkOut},check_out >= ${checkIn})`
//       );

//     if (bookingError) {
//       console.error("Error fetching bookings:", bookingError);
//       return { success: false, rooms: [], message: "Failed to fetch bookings" };
//     }

//     const bookedRoomIds = new Set(bookedRooms?.map((b) => b.room_id));

//     // Step 3: Filter out booked rooms
//     const availableRooms =
//       allRooms?.filter((room) => !bookedRoomIds.has(room.id)) || [];

//     return { success: true, rooms: availableRooms };
//   } catch (error) {
//     console.error("Unexpected error in searchAvailableRooms:", error);
//     return { success: false, rooms: [], message: "Unexpected error" };
//   }
// };

// import { supabase } from "../supabaseClient";

// // Returns available rooms between checkIn and checkOut
// export const searchAvailableRooms = async (
//   checkIn: string,
//   checkOut: string
// ) => {
//   try {
//     // Step 1: Get all rooms
//     const { data: rooms, error: roomsError } = await supabase
//       .from("rooms") // <-- make sure table name matches
//       .select("*");

//     if (roomsError) throw roomsError;
//     if (!rooms)
//       return { success: false, rooms: [], message: "No rooms found." };

//     // Step 2: Get bookings overlapping with requested dates
//     const { data: bookings, error: bookingsError } = await supabase
//       .from("bookings")
//       .select("room_id, check_in, check_out");

//     if (bookingsError) throw bookingsError;

//     // Step 3: Filter out booked rooms
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const availableRooms = rooms.filter((room: any) => {
//       const overlapping = (bookings || []).some(
//         // eslint-disable-next-line @typescript-eslint/no-explicit-any
//         (b: any) =>
//           b.room_id === room.id &&
//           new Date(checkIn) < new Date(b.check_out) &&
//           new Date(b.check_in) < new Date(checkOut)
//       );
//       return !overlapping;
//     });

//     return { success: true, rooms: availableRooms };
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   } catch (err: any) {
//     console.error("Error fetching rooms:", err);
//     return {
//       success: false,
//       rooms: [],
//       message: err.message || "Error fetching rooms.",
//     };
//   }
// };

// import { supabase } from "../supabaseClient";

// export const searchAvailableRooms = async (
//   checkIn: string,
//   checkOut: string
// ) => {
//   try {
//     const { data, error } = await supabase
//       .from("rooms")
//       .select(`*, bookings:bookings(*)`) // include related bookings
//       .not("bookings.period", "&&", `[${checkIn},${checkOut}]`); // filter out overlapping bookings

//     if (error) {
//       console.error("Error fetching rooms:", error);
//       return { success: false, rooms: [], message: error.message };
//     }

//     return {
//       success: true,
//       rooms: data,
//       message: "Rooms fetched successfully",
//     };
//   } catch (err) {
//     console.error("searchAvailableRooms unexpected error:", err);
//     return { success: false, rooms: [], message: "Unexpected error" };
//   }
// };

// roomService.ts
import { supabase } from "../supabaseClient";

export const searchAvailableRooms = async (
  checkIn: string,
  checkOut: string
) => {
  try {
    const { data, error } = await supabase.rpc("get_available_rooms", {
      _check_in: checkIn,
      _check_out: checkOut,
    });

    if (error) throw error;

    return { success: true, rooms: data };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error("Error fetching rooms:", err);
    return { success: false, rooms: [], message: err.message };
  }
};
