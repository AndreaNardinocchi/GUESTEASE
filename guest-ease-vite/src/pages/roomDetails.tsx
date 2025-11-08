// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useBooking } from "../context/bookingContext"; // Assuming this is where we get the context

// const RoomDetails: React.FC = () => {
//   const { roomId } = useParams(); // Get roomId from the URL
//   const { searchAvailableRooms, loading } = useBooking(); // Get the searchRoomsService from context
//   const [room, setRoom] = useState<any | null>(null); // Room data state
//   const [error, setError] = useState<string | null>(null); // Error state
//   const [rooms, setRooms] = useState<any[]>([]); // Rooms list state (temporarily to fetch available rooms)

//   useEffect(() => {
//     if (!roomId) {
//       setError("Room ID is missing");
//       return;
//     }

//     const fetchRoomDetails = async () => {
//       try {
//         // Fetch available rooms (you can replace the dates below with dynamic ones if needed)
//         const checkIn = "2023-12-01"; // Example check-in date
//         const checkOut = "2023-12-10"; // Example check-out date

//         const result = await searchAvailableRooms(checkIn, checkOut);

//         if (result.success) {
//           setRooms(result.rooms); // Set the rooms to the state
//         } else {
//           setError(result.message || "Failed to fetch rooms.");
//         }
//       } catch (err) {
//         setError("Unexpected error occurred while fetching rooms.");
//       }
//     };

//     fetchRoomDetails();
//   }, [roomId, searchAvailableRooms]);

//   useEffect(() => {
//     // Once rooms are loaded, find the room based on roomId
//     if (rooms.length > 0) {
//       const foundRoom = rooms.find((r: any) => r.id === roomId);
//       if (foundRoom) {
//         setRoom(foundRoom); // Set the found room to the state
//       } else {
//         setError("Room not found.");
//       }
//     }
//   }, [rooms, roomId]);

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   if (!room) {
//     return <div>No room details available.</div>;
//   }

//   return (
//     <div>
//       <h2>{room.name}</h2>
//       <img src={room.image_url || "/default-room-image.jpg"} alt={room.name} />
//       <p>{room.description}</p>
//       <p>Capacity: {room.capacity}</p>
//       <p>Price: €{room.price}</p>
//       <button>Book Now</button>
//     </div>
//   );
// };

// export default RoomDetails;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useBooking } from "../context/bookingContext";
// import {
//   Box,
//   Card,
//   CardContent,
//   CardMedia,
//   Button,
//   Typography,
//   Grid,
//   CircularProgress,
//   Alert,
//   TextField,
//   MenuItem,
// } from "@mui/material";

// const RoomDetails: React.FC = () => {
//   const { roomId } = useParams(); // Get roomId from the URL
//   const { searchAvailableRooms, loading, bookRoom } = useBooking(); // Get the searchRoomsService and bookRoom function from context
//   const [room, setRoom] = useState<any | null>(null); // Room data state
//   const [error, setError] = useState<string | null>(null); // Error state
//   const [rooms, setRooms] = useState<any[]>([]); // Rooms list state (temporarily to fetch available rooms)
//   const [checkIn, setCheckIn] = useState<string>("2023-12-01"); // Default check-in date
//   const [checkOut, setCheckOut] = useState<string>("2023-12-10"); // Default check-out date
//   const [guests, setGuests] = useState<number>(1); // Default guests

//   useEffect(() => {
//     if (!roomId) {
//       setError("Room ID is missing");
//       return;
//     }

//     const fetchRoomDetails = async () => {
//       try {
//         // Fetch available rooms (you can replace the dates below with dynamic ones if needed)
//         const result = await searchAvailableRooms(checkIn, checkOut);

//         if (result.success) {
//           setRooms(result.rooms); // Set the rooms to the state
//         } else {
//           setError(result.message || "Failed to fetch rooms.");
//         }
//       } catch (err) {
//         setError("Unexpected error occurred while fetching rooms.");
//       }
//     };

//     fetchRoomDetails();
//   }, [roomId, checkIn, checkOut, searchAvailableRooms]);

//   useEffect(() => {
//     // Once rooms are loaded, find the room based on roomId
//     if (rooms.length > 0) {
//       const foundRoom = rooms.find((r: any) => r.id === roomId);
//       if (foundRoom) {
//         setRoom(foundRoom); // Set the found room to the state
//       } else {
//         setError("Room not found.");
//       }
//     }
//   }, [rooms, roomId]);

//   const handleBooking = async () => {
//     if (!checkIn || !checkOut || guests <= 0) {
//       setError("Please fill in all booking details.");
//       return;
//     }

//     const newBooking = {
//       room_id: roomId!,
//       check_in: checkIn,
//       check_out: checkOut,
//       guests: guests,
//     };

//     const result = await bookRoom(newBooking);
//     if (result.success) {
//       alert("Booking successful!");
//     } else {
//       setError(result.message || "Booking failed.");
//     }
//   };

//   if (loading) {
//     return (
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         height="100vh"
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Alert severity="error" sx={{ marginTop: 2 }}>
//         {error}
//       </Alert>
//     );
//   }

//   if (!room) {
//     return (
//       <Alert severity="error" sx={{ marginTop: 2 }}>
//         No room details available.
//       </Alert>
//     );
//   }

//   return (
//     <Box sx={{ padding: 4 }}>
//       <Card
//         sx={{
//           display: "flex",
//           flexDirection: { xs: "column", md: "row" },
//           borderRadius: 2,
//         }}
//       >
//         <CardMedia
//           component="img"
//           sx={{
//             width: { xs: "100%", md: 400 },
//             height: 300,
//             objectFit: "cover",
//             borderRadius: 2,
//           }}
//           image={room.image_url || "/default-room-image.jpg"}
//           alt={room.name}
//         />
//         <CardContent sx={{ padding: 4 }}>
//           <Typography variant="h4" component="div" sx={{ fontWeight: "bold" }}>
//             {room.name}
//           </Typography>
//           <Typography
//             variant="body1"
//             sx={{ marginTop: 2, color: "text.secondary" }}
//           >
//             {room.description ||
//               "A cozy and comfortable room designed for your perfect stay."}
//           </Typography>

//           <Grid container spacing={2} sx={{ marginTop: 3 }}>
//             <Grid item xs={6}>
//               <Typography variant="body2" color="text.secondary">
//                 Capacity:
//               </Typography>
//               <Typography variant="body1">
//                 {room.capacity || "N/A"} guests
//               </Typography>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography variant="body2" color="text.secondary">
//                 Price:
//               </Typography>
//               <Typography variant="h6" color="primary">
//                 €{room.price} / night
//               </Typography>
//             </Grid>
//           </Grid>

//           <Box sx={{ marginTop: 3 }}>
//             <Typography variant="body2" color="text.secondary">
//               Available Services:
//             </Typography>
//             <Typography variant="body1" sx={{ marginTop: 1 }}>
//               - Free WiFi
//               <br />
//               - Daily housekeeping
//               <br />
//               - Complimentary breakfast
//               <br />
//               - Swimming pool access
//               <br />- 24/7 Concierge service
//             </Typography>
//           </Box>

//           {/* Booking Form */}
//           <Box sx={{ marginTop: 3 }}>
//             <TextField
//               label="Check-in Date"
//               type="date"
//               value={checkIn}
//               onChange={(e) => setCheckIn(e.target.value)}
//               fullWidth
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />
//             <TextField
//               label="Check-out Date"
//               type="date"
//               value={checkOut}
//               onChange={(e) => setCheckOut(e.target.value)}
//               fullWidth
//               sx={{ marginTop: 2 }}
//               InputLabelProps={{
//                 shrink: true,
//               }}
//             />
//             <TextField
//               label="Guests"
//               type="number"
//               value={guests}
//               onChange={(e) => setGuests(Number(e.target.value))}
//               fullWidth
//               sx={{ marginTop: 2 }}
//             />
//           </Box>

//           <Button
//             variant="contained"
//             color="primary"
//             fullWidth
//             sx={{ marginTop: 3 }}
//             onClick={handleBooking}
//           >
//             Book Now
//           </Button>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default RoomDetails;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useBooking } from "../context/bookingContext";
// import {
//   Box,
//   Card,
//   CardContent,
//   CardMedia,
//   Button,
//   Typography,
//   Grid,
//   CircularProgress,
//   Alert,
//   TextField,
// } from "@mui/material";

// const RoomDetails: React.FC = () => {
//   const { roomId } = useParams(); // Get roomId from the URL
//   const { searchAvailableRooms, loading, bookRoom } = useBooking(); // Get the searchRoomsService and bookRoom function from context
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [room, setRoom] = useState<any | null>(null); // Room data state
//   const [error, setError] = useState<string | null>(null); // Error state
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   const [rooms, setRooms] = useState<any[]>([]); // Rooms list state (temporarily to fetch available rooms)
//   const [guests, setGuests] = useState<number>(1); // Default guests

//   // Default check-in and check-out dates (fixed as requested)
//   const checkIn = "2023-12-01"; // Default check-in date
//   const checkOut = "2023-12-10"; // Default check-out date

//   useEffect(() => {
//     if (!roomId) {
//       setError("Room ID is missing");
//       return;
//     }

//     const fetchRoomDetails = async () => {
//       try {
//         // Fetch available rooms for the given check-in and check-out dates
//         const result = await searchAvailableRooms(checkIn, checkOut);

//         if (result.success) {
//           setRooms(result.rooms); // Set the rooms to the state
//         } else {
//           setError(result.message || "Failed to fetch rooms.");
//         }
//       } catch (err) {
//         setError("Unexpected error occurred while fetching rooms.");
//       }
//     };

//     fetchRoomDetails();
//   }, [roomId, checkIn, checkOut, searchAvailableRooms]);

//   useEffect(() => {
//     // Once rooms are loaded, find the room based on roomId
//     if (rooms.length > 0) {
//       // eslint-disable-next-line @typescript-eslint/no-explicit-any
//       const foundRoom = rooms.find((r: any) => r.id === roomId);
//       if (foundRoom) {
//         setRoom(foundRoom); // Set the found room to the state
//       } else {
//         setError("Room not found.");
//       }
//     }
//   }, [rooms, roomId]);

//   const handleBooking = async () => {
//     if (guests <= 0) {
//       setError("Please select a valid number of guests.");
//       return;
//     }

//     const newBooking = {
//       room_id: roomId!,
//       check_in: checkIn,
//       check_out: checkOut,
//       guests: guests,
//     };

//     const result = await bookRoom(newBooking);
//     if (result.success) {
//       alert("Booking successful!");
//     } else {
//       setError(result.message || "Booking failed.");
//     }
//   };

//   if (loading) {
//     return (
//       <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         height="100vh"
//       >
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Alert severity="error" sx={{ marginTop: 2 }}>
//         {error}
//       </Alert>
//     );
//   }

//   if (!room) {
//     return (
//       <Alert severity="error" sx={{ marginTop: 2 }}>
//         No room details available.
//       </Alert>
//     );
//   }

//   return (
//     <Box sx={{ padding: 4 }}>
//       <Card
//         sx={{
//           display: "flex",
//           flexDirection: { xs: "column", md: "row" },
//           borderRadius: 2,
//         }}
//       >
//         <CardMedia
//           component="img"
//           sx={{
//             width: { xs: "100%", md: 400 },
//             height: 300,
//             objectFit: "cover",
//             borderRadius: 2,
//           }}
//           image={room.image_url || "/default-room-image.jpg"}
//           alt={room.name}
//         />
//         <CardContent sx={{ padding: 4 }}>
//           <Typography variant="h4" component="div" sx={{ fontWeight: "bold" }}>
//             {room.name}
//           </Typography>
//           <Typography
//             variant="body1"
//             sx={{ marginTop: 2, color: "text.secondary" }}
//           >
//             {room.description ||
//               "A cozy and comfortable room designed for your perfect stay."}
//           </Typography>

//           <Grid container spacing={2} sx={{ marginTop: 3 }}>
//             <Grid item xs={6}>
//               <Typography variant="body2" color="text.secondary">
//                 Capacity:
//               </Typography>
//               <Typography variant="body1">
//                 {room.capacity || "N/A"} guests
//               </Typography>
//             </Grid>
//             <Grid item xs={6}>
//               <Typography variant="body2" color="text.secondary">
//                 Price:
//               </Typography>
//               <Typography variant="h6" color="primary">
//                 €{room.price} / night
//               </Typography>
//             </Grid>
//           </Grid>

//           <Box sx={{ marginTop: 3 }}>
//             <Typography variant="body2" color="text.secondary">
//               Available Services:
//             </Typography>
//             <Typography variant="body1" sx={{ marginTop: 1 }}>
//               - Free WiFi
//               <br />
//               - Daily housekeeping
//               <br />
//               - Complimentary breakfast
//               <br />
//               - Swimming pool access
//               <br />- 24/7 Concierge service
//             </Typography>
//           </Box>

//           {/* Booking Form */}
//           <Box sx={{ marginTop: 3 }}>
//             <TextField
//               label="Guests"
//               type="number"
//               value={guests}
//               onChange={(e) => setGuests(Number(e.target.value))}
//               fullWidth
//               sx={{ marginTop: 2 }}
//             />
//           </Box>

//           <Button
//             variant="contained"
//             color="primary"
//             fullWidth
//             sx={{ marginTop: 3 }}
//             onClick={handleBooking}
//           >
//             Book Now
//           </Button>
//         </CardContent>
//       </Card>
//     </Box>
//   );
// };

// export default RoomDetails;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useBooking } from "../context/bookingContext";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
  CircularProgress,
  Alert,
  TextField,
} from "@mui/material";

const RoomDetails: React.FC = () => {
  const { roomId } = useParams();

  //   // Fetch movie data (including cast details) using React Query's useQuery hook
  // const {
  //   data: room, // The fetched movie data will be stored in 'movie'
  //   error, // Error object if the query fails
  //   isLoading, // Boolean flag indicating if the query is currently loading
  //   isError, // Boolean flag indicating if there was an error during the query
  // } = useQuery<MovieDetailsProps, Error>(
  //   ["movie", id, lang], // Unique query key for caching and refetching
  //   () =>
  //     // Fetch the movie with cast information using the provided function
  //     fetchMovieWithCast(id || "", lang)
  // );

  const { searchAvailableRooms, loading, bookRoom } = useBooking();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [room, setRoom] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [rooms, setRooms] = useState<any[]>([]);
  const [guests, setGuests] = useState<number>(1);

  // Editable check-in and check-out dates
  const [checkIn, setCheckIn] = useState<string>("01/01/2025");
  const [checkOut, setCheckOut] = useState<string>("01/01/2025");

  useEffect(() => {
    if (rooms.length && roomId) {
      const foundRoom = rooms.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (r: any) => String(r.id) === String(roomId)
      );
      if (foundRoom) {
        setRoom(foundRoom);
      } else {
        setError("No room found");
      }
    }
  }, [rooms, roomId]);

  /**
   * This is the browser title
   * https://stackoverflow.com/questions/46160461/how-do-you-set-the-document-title-in-react?
   */
  // useEffect(() => {
  //   // document.title = `${t("login")} | MoviesApp`;
  //   document.title = `Room ${room.name} details | GuestEase`;
  //   //   }, [t]);
  // });

  useEffect(() => {
    if (room) {
      document.title = `${room.name} details | GuestEase`;
    }
  }, [room]);

  useEffect(() => {
    if (!roomId) {
      setError("Room ID is missing");
      return;
    }

    const fetchRoomDetails = async () => {
      try {
        const result = await searchAvailableRooms(checkIn, checkOut);
        if (result.success) {
          setRooms(result.rooms);
        } else {
          setError(result.message || "Failed to fetch rooms.");
        }
      } catch {
        setError("Unexpected error occurred while fetching rooms.");
      }
    };

    fetchRoomDetails();
  }, [roomId, checkIn, checkOut, searchAvailableRooms]);

  useEffect(() => {
    if (rooms.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const foundRoom = rooms.find((r: any) => r.id === roomId);
      if (foundRoom) {
        setRoom(foundRoom);
      } else {
        setError("Room not found.");
      }
    }
  }, [rooms, roomId]);

  const handleBooking = async () => {
    if (guests <= 0) {
      setError("Please select a valid number of guests.");
      return;
    }

    if (!checkIn || !checkOut) {
      setError("Please select valid check-in and check-out dates.");
      return;
    }

    if (new Date(checkIn) >= new Date(checkOut)) {
      setError("Check-out date must be after check-in date.");
      return;
    }

    const newBooking = {
      room_id: roomId!,
      check_in: checkIn,
      check_out: checkOut,
      guests,
    };

    const result = await bookRoom(newBooking);
    if (result.success) {
      alert("Booking successful!");
    } else {
      setError(result.message || "Booking failed.");
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Alert severity="error" sx={{ marginTop: 2 }}>
        {error}
      </Alert>
    );
  }

  if (!room) {
    return (
      <Alert severity="error" sx={{ marginTop: 2 }}>
        No room details available.
      </Alert>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Card
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          borderRadius: 2,
        }}
      >
        <CardMedia
          component="img"
          sx={{
            width: { xs: "100%", md: 400 },
            height: 300,
            objectFit: "cover",
            borderRadius: 2,
          }}
          image={room.image_url || "/default-room-image.jpg"}
          alt={room.name}
        />
        <CardContent sx={{ padding: 4 }}>
          <Typography variant="h4" component="div" sx={{ fontWeight: "bold" }}>
            {room.name}
          </Typography>
          <Typography
            variant="body1"
            sx={{ marginTop: 2, color: "text.secondary" }}
          >
            {room.description ||
              "A cozy and comfortable room designed for your perfect stay."}
          </Typography>

          <Grid container spacing={2} sx={{ marginTop: 3 }}>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Capacity:
              </Typography>
              <Typography variant="body1">
                {room.capacity || "N/A"} guests
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body2" color="text.secondary">
                Price:
              </Typography>
              <Typography variant="h6" color="primary">
                €{room.price} / night
              </Typography>
            </Grid>
          </Grid>

          <Box sx={{ marginTop: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Available Services:
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 1 }}>
              - Free WiFi
              <br />
              - Daily housekeeping
              <br />
              - Complimentary breakfast
              <br />
              - Swimming pool access
              <br />- 24/7 Concierge service
            </Typography>
          </Box>

          {/* Booking Form */}
          <Box sx={{ marginTop: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Check-in Date"
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Check-out Date"
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
            </Grid>

            <TextField
              label="Guests"
              type="number"
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              fullWidth
              sx={{ marginTop: 2 }}
              inputProps={{ min: 1 }}
            />
          </Box>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 3 }}
            onClick={handleBooking}
          >
            Book Now
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default RoomDetails;
