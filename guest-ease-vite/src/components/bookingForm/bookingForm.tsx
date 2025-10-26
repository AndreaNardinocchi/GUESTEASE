// import { useState, useEffect } from "react";
// import {
//   Container,
//   Typography,
//   TextField,
//   Select,
//   MenuItem,
//   Button,
//   FormControl,
//   InputLabel,
//   Alert,
//   Box,
//   List,
//   ListItem,
//   ListItemText,
// } from "@mui/material";
// import { supabase } from "../../supabaseClient"; // adjust path as needed

// // Type for booking record
// interface Booking {
//   id: number;
//   guest_name: string;
//   room_name: string;
// }

// const rooms = [
//   { id: 1, name: "Room 101" },
//   { id: 2, name: "Room 102" },
//   { id: 3, name: "Room 103" },
// ];

// const BookingForm: React.FC = () => {
//   const [guestName, setGuestName] = useState<string>("");
//   const [selectedRoom, setSelectedRoom] = useState<string>("");
//   const [message, setMessage] = useState<string>("");
//   const [error, setError] = useState<string>("");
//   const [bookings, setBookings] = useState<Booking[]>([]);

//   useEffect(() => {
//     fetchBookings();
//   }, []);

//   const fetchBookings = async () => {
//     const { data, error } = await supabase.from("bookings").select("*");
//     if (error) console.error(error);
//     else setBookings(data || []);
//   };

//   const handleBooking = async () => {
//     setMessage("");
//     setError("");

//     if (!guestName || !selectedRoom) {
//       setError("Please enter your name and select a room.");
//       return;
//     }

//     const { error } = await supabase.from("bookings").insert([
//       {
//         guest_name: guestName,
//         room_name: selectedRoom,
//       },
//     ]);

//     if (error) {
//       console.error(error);
//       setError("Failed to save booking");
//     } else {
//       setMessage(`${guestName} booked ${selectedRoom}`);
//       setGuestName("");
//       setSelectedRoom("");
//       fetchBookings();
//     }
//   };

//   return (
//     <Container maxWidth="sm" sx={{ mt: 5 }}>
//       <Typography variant="h4" gutterBottom>
//         GuestEase (Supabase + TypeScript)
//       </Typography>

//       <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
//         <TextField
//           label="Your Name"
//           variant="outlined"
//           value={guestName}
//           onChange={(e) => setGuestName(e.target.value)}
//           fullWidth
//         />
//         <FormControl fullWidth>
//           <InputLabel>Room</InputLabel>
//           <Select
//             value={selectedRoom}
//             onChange={(e) => setSelectedRoom(e.target.value)}
//             label="Room"
//           >
//             {rooms.map((room) => (
//               <MenuItem key={room.id} value={room.name}>
//                 {room.name}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </Box>

//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleBooking}
//         fullWidth
//       >
//         Book
//       </Button>

//       {message && (
//         <Alert severity="success" sx={{ mt: 2 }}>
//           {message}
//         </Alert>
//       )}
//       {error && (
//         <Alert severity="error" sx={{ mt: 2 }}>
//           {error}
//         </Alert>
//       )}

//       <Typography variant="h6" sx={{ mt: 4 }}>
//         All Bookings
//       </Typography>
//       <List>
//         {bookings.map((b) => (
//           <ListItem key={b.id}>
//             <ListItemText primary={`${b.guest_name} → ${b.room_name}`} />
//           </ListItem>
//         ))}
//       </List>
//     </Container>
//   );
// };

// export default BookingForm;

// import React, { useState } from "react";

// type BookingFormData = {
//   checkIn: string;
//   checkOut: string;
//   guests: number;
// };

// const BookingForm: React.FC = () => {
//   const [formData, setFormData] = useState<BookingFormData>({
//     checkIn: "",
//     checkOut: "",
//     guests: 1,
//   });

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: name === "guests" ? Number(value) : value,
//     }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!formData.checkIn || !formData.checkOut) {
//       alert("Please select both check-in and check-out dates.");
//       return;
//     }
//     if (formData.guests < 1) {
//       alert("Number of guests must be at least 1.");
//       return;
//     }
//     console.log("Booking data:", formData);
//     alert(
//       `Booking confirmed!\nCheck-in: ${formData.checkIn}\nCheck-out: ${formData.checkOut}\nGuests: ${formData.guests}`
//     );
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       style={{
//         display: "flex",
//         gap: "1rem",
//         alignItems: "flex-end",
//         maxWidth: 800,
//         margin: "2rem auto",
//       }}
//     >
//       {/* Check-in */}
//       {/* <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
//         <label style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>
//           Check-in
//         </label>
//         <input
//           type="date"
//           name="checkIn"
//           value={formData.checkIn}
//           onChange={handleChange}
//           style={{ padding: "0.5rem", fontSize: "1rem", borderRadius: "4px" }}
//           required
//         />
//       </div> */}

//       <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
//         <label style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>
//           Check-in
//         </label>
//         <input
//           type="date"
//           name="checkIn"
//           value={formData.checkIn}
//           onChange={handleChange}
//           required
//           style={{
//             padding: "0.75rem",
//             fontSize: "1rem",
//             borderRadius: "10px",
//             border: "1px solid #ccc",
//             boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
//             outline: "none",
//             backgroundColor: "#fff",
//             transition: "transform 0.2s, box-shadow 0.2s",
//           }}
//           onFocus={(e) => {
//             e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.35)";
//             e.currentTarget.style.transform = "translateY(-4px)";
//           }}
//           onBlur={(e) => {
//             e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.25)";
//             e.currentTarget.style.transform = "translateY(0)";
//           }}
//         />
//       </div>

//       {/* Check-out */}
//       <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
//         <label style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>
//           Check-out
//         </label>
//         <input
//           type="date"
//           name="checkOut"
//           value={formData.checkOut}
//           onChange={handleChange}
//           required
//           style={{
//             padding: "0.75rem",
//             fontSize: "1rem",
//             borderRadius: "10px",
//             border: "1px solid #ccc",
//             boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
//             outline: "none",
//             backgroundColor: "#fff",
//             transition: "transform 0.2s, box-shadow 0.2s",
//           }}
//           onFocus={(e) => {
//             e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.35)";
//             e.currentTarget.style.transform = "translateY(-4px)";
//           }}
//           onBlur={(e) => {
//             e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.25)";
//             e.currentTarget.style.transform = "translateY(0)";
//           }}
//         />
//       </div>
//       {/* <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
//         <label style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>
//           Check-out
//         </label>
//         <input
//           type="date"
//           name="checkOut"
//           value={formData.checkOut}
//           onChange={handleChange}
//           style={{ padding: "0.5rem", fontSize: "1rem" }}
//           required
//         />
//       </div> */}

//       {/* Guests */}

//       <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
//         <label style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>
//           Guests
//         </label>
//         <input
//           type="number"
//           name="guests"
//           value={formData.guests}
//           onChange={handleChange}
//           min={1}
//           style={{
//             padding: "0.80rem",
//             fontSize: "1rem",
//             borderRadius: "10px",
//             border: "1px solid #ccc",
//             boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
//             outline: "none",
//             backgroundColor: "#fff",
//             transition: "transform 0.2s, box-shadow 0.2s",
//           }}
//           onFocus={(e) => {
//             e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.35)";
//             e.currentTarget.style.transform = "translateY(-4px)";
//           }}
//           onBlur={(e) => {
//             e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.25)";
//             e.currentTarget.style.transform = "translateY(0)";
//           }}
//         />
//       </div>
//       {/* <div style={{ display: "flex", flexDirection: "column", flex: 0.5 }}>
//         <label style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>
//           Guests
//         </label>
//         <input
//           type="number"
//           name="guests"
//           value={formData.guests}
//           onChange={handleChange}
//           min={1}
//           style={{ padding: "0.5rem", fontSize: "1rem" }}
//         />
//       </div> */}

//       {/* Book Now button */}
//       <div>
//         <button
//           type="submit"
//           style={{
//             padding: "0.80rem 1.5rem",
//             fontSize: "1rem",
//             borderRadius: "10px",
//             boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
//             backgroundColor: "#4CAF50",
//             color: "white",
//             border: "none",
//             cursor: "pointer",
//           }}
//         >
//           Book Now
//         </button>
//       </div>
//     </form>
//   );
// };

// export default BookingForm;

import React, { useState } from "react";
import { useBooking } from "../../context/bookingContext";

type BookingFormData = {
  checkIn: string;
  checkOut: string;
  guests: number;
};

const inputStyle: React.CSSProperties = {
  padding: "0.75rem",
  fontSize: "1rem",
  borderRadius: "10px",
  border: "1px solid #ccc",
  boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
  outline: "none",
  backgroundColor: "#fff",
  transition: "transform 0.2s, box-shadow 0.2s",
  boxSizing: "border-box",
  flex: 1, // stretch inside parent
};

const BookingForm: React.FC = () => {
  const { bookRoom } = useBooking(); // 👈 use the context

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.checkIn || !formData.checkOut) {
      alert("Please select both check-in and check-out dates.");
      return;
    }

    const result = await bookRoom({
      room_id: "room_101", // You can later make this dynamic
      check_in: formData.checkIn,
      check_out: formData.checkOut,
      guests: formData.guests,
    });

    if (!result.success) {
      alert(`❌ ${result.message}`);
    } else {
      alert(`✅ ${result.message}`);
    }
  };

  const [formData, setFormData] = useState<BookingFormData>({
    checkIn: "",
    checkOut: "",
    guests: 1,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "guests" ? Number(value) : value,
    }));
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.35)";
    e.currentTarget.style.transform = "translateY(-4px)";
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.25)";
    e.currentTarget.style.transform = "translateY(0)";
  };

  const handleButtonHover = (
    e: React.MouseEvent<HTMLButtonElement>,
    hover: boolean
  ) => {
    const btn = e.currentTarget;
    if (hover) {
      btn.style.backgroundColor = "#ffe6f0";
      btn.style.color = "#000";
      btn.style.boxShadow = "0 10px 30px rgba(0,0,0,0.35)";
      btn.style.transform = "translateY(-2px)";
    } else {
      btn.style.backgroundColor = "#8E4585";
      btn.style.color = "#fff";
      btn.style.boxShadow = "0 6px 20px rgba(0,0,0,0.25)";
      btn.style.transform = "translateY(0)";
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        gap: "1rem",
        maxWidth: 800,
        margin: "2rem auto",
        alignItems: "stretch", // all children same height
      }}
    >
      {["checkIn", "checkOut"].map((field) => (
        <div
          key={field}
          style={{ display: "flex", flexDirection: "column", flex: 1 }}
        >
          <label style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>
            {field === "checkIn" ? "Check-in" : "Check-out"}
          </label>
          <input
            type="date"
            name={field}
            value={formData[field as keyof BookingFormData] as string}
            onChange={handleChange}
            required
            style={inputStyle}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
        </div>
      ))}

      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <label style={{ marginBottom: "0.5rem", fontWeight: "bold" }}>
          Guests
        </label>
        <input
          type="number"
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          min={1}
          style={inputStyle}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
        }}
      >
        <button
          type="submit"
          style={{
            height: "3rem", // same as input
            padding: "0 1.5rem", // horizontal padding only
            fontSize: "1rem",
            fontWeight: 500,
            fontFamily: "inherit",
            borderRadius: "10px",
            border: "none",
            backgroundColor: "#8E4585",
            color: "#fff",
            boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.2s",
            boxSizing: "border-box",
          }}
          onMouseEnter={(e) => handleButtonHover(e, true)}
          onMouseLeave={(e) => handleButtonHover(e, false)}
        >
          Book Now
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
