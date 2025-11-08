// // src/pages/SearchResults.tsx
// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import { useBooking } from "../context/bookingContext";

// type Room = {
//   id: string;
//   name: string;
//   description?: string;
//   capacity?: number;
//   price?: number;
//   image_url?: string;
// };

// const SearchResults: React.FC = () => {
//   const location = useLocation();
//   const { searchAvailableRooms, bookRoom } = useBooking();

//   // Read state passed from BookingForm
//   // Fallback to empty if no state exists
//   const state = location.state as
//     | {
//         searchParams: { checkIn: string; checkOut: string };
//         availableRooms?: Room[];
//       }
//     | undefined;

//   const [rooms, setRooms] = useState<Room[]>(state?.availableRooms || []);
//   const [loading, setLoading] = useState(!state?.availableRooms); // only load if rooms not preloaded

//   const checkIn = state?.searchParams.checkIn;
//   const checkOut = state?.searchParams.checkOut;

//   useEffect(() => {
//     // If rooms already passed via state, no need to fetch
//     if (!checkIn || !checkOut || state?.availableRooms) return;

//     const loadRooms = async () => {
//       setLoading(true);
//       const result = await searchAvailableRooms(checkIn, checkOut);
//       if (result.success) setRooms(result.rooms);
//       setLoading(false);
//     };

//     loadRooms();
//   }, [checkIn, checkOut, searchAvailableRooms, state?.availableRooms]);

//   if (loading)
//     return <p className="text-center p-8">Loading available rooms...</p>;
//   if (!rooms.length)
//     return (
//       <p className="text-center p-8">No rooms available for these dates.</p>
//     );

//   return (
//     <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//       {rooms.map((room) => (
//         <div
//           key={room.id}
//           className="bg-white shadow-lg rounded-2xl p-4 hover:shadow-xl transition"
//         >
//           {room.image_url && (
//             <img
//               src={room.image_url}
//               alt={room.name}
//               className="rounded-xl mb-3 h-40 w-full object-cover"
//             />
//           )}
//           <h2 className="text-lg font-semibold">{room.name}</h2>
//           {room.description && (
//             <p className="text-gray-500 text-sm mb-2">{room.description}</p>
//           )}
//           {room.price && (
//             <p className="font-bold text-gray-800 mb-3">
//               €{room.price} / night
//             </p>
//           )}
//           {/* <button
//             className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
//             onClick={() => alert(`Book room ${room.name}`)}
//           >
//             Book Now
//           </button> */}

//           <button
//             className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
//             onClick={async () => {
//               if (!checkIn || !checkOut) {
//                 alert("Invalid dates.");
//                 return;
//               }

//               const { success, message } = await bookRoom({
//                 room_id: room.name,
//                 check_in: checkIn,
//                 check_out: checkOut,
//                 guests: 1, // optionally let user select guests
//               });

//               if (success) {
//                 alert(`Room ${room.name} booked successfully!`);
//               } else {
//                 alert(`❌ Failed to book room: ${message}`);
//               }
//             }}
//           >
//             Book Now
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default SearchResults;

// src/pages/SearchResults.tsx
// import React, { useEffect, useState } from "react";
// import { useLocation, Link } from "react-router-dom";
// import { useBooking } from "../context/bookingContext";

// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Container,
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   CardActions,
//   Button,
//   CircularProgress,
//   Box,
//   Alert,
// } from "@mui/material";
// import HotelIcon from "@mui/icons-material/Hotel";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

// type Room = {
//   id: string;
//   name: string;
//   description?: string;
//   capacity?: number;
//   price?: number;
//   image_url?: string;
// };

// const SearchResults: React.FC = () => {
//   const location = useLocation();
//   const { searchAvailableRooms, bookRoom } = useBooking();

//   const state = location.state as
//     | {
//         searchParams: { checkIn: string; checkOut: string };
//         availableRooms?: Room[];
//       }
//     | undefined;

//   const [rooms, setRooms] = useState<Room[]>(state?.availableRooms || []);
//   const [loading, setLoading] = useState(!state?.availableRooms);
//   const [error, setError] = useState<string | null>(null);
//   const [bookingStatus, setBookingStatus] = useState<Record<string, boolean>>(
//     {}
//   );

//   const checkIn = state?.searchParams.checkIn;
//   const checkOut = state?.searchParams.checkOut;

//   useEffect(() => {
//     if (!checkIn || !checkOut || state?.availableRooms) return;

//     const loadRooms = async () => {
//       try {
//         setLoading(true);
//         const result = await searchAvailableRooms(checkIn, checkOut);
//         if (result.success) {
//           setRooms(result.rooms);
//         } else {
//           setError(result.message || "Failed to load rooms");
//         }
//         // eslint-disable-next-line @typescript-eslint/no-unused-vars
//       } catch (err) {
//         setError("An unexpected error occurred.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadRooms();
//   }, [checkIn, checkOut, searchAvailableRooms, state?.availableRooms]);

//   const handleBookRoom = async (room: Room) => {
//     if (!checkIn || !checkOut) {
//       alert("Invalid dates.");
//       return;
//     }

//     // ✅ prevent double-click
//     if (bookingStatus[room.id]) return;

//     setBookingStatus((prev) => ({ ...prev, [room.id]: true }));

//     const { success, message } = await bookRoom({
//       room_id: room.name,
//       check_in: checkIn,
//       check_out: checkOut,
//       guests: 1,
//     });

//     if (success) {
//       alert(`✅ Room "${room.name}" booked successfully!`);
//     } else {
//       alert(`❌ Failed to book room: ${message}`);
//     }

//     // Re-enable button (or keep disabled if you prefer)
//     setBookingStatus((prev) => ({ ...prev, [room.id]: false }));
//   };

//   return (
//     <>
//       {/* HEADER */}
//       <AppBar position="static" color="primary" elevation={2}>
//         <Toolbar>
//           <HotelIcon sx={{ mr: 1 }} />
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             Search Results
//           </Typography>
//           {checkIn && checkOut && (
//             <Box display="flex" alignItems="center" gap={1}>
//               <CalendarMonthIcon />
//               <Typography variant="body2">
//                 {checkIn} → {checkOut}
//               </Typography>
//             </Box>
//           )}
//         </Toolbar>
//       </AppBar>

//       {/* MAIN CONTENT */}
//       <Container sx={{ py: 6 }}>
//         {loading ? (
//           <Box display="flex" justifyContent="center" mt={10}>
//             <CircularProgress />
//           </Box>
//         ) : error ? (
//           <Alert severity="error">{error}</Alert>
//         ) : rooms.length === 0 ? (
//           <Box textAlign="center" mt={10}>
//             <Typography variant="h6" color="text.secondary" gutterBottom>
//               No rooms available for these dates.
//             </Typography>
//             <Button
//               component={Link}
//               to="/"
//               variant="contained"
//               color="primary"
//               sx={{ mt: 2 }}
//             >
//               Try New Dates
//             </Button>
//           </Box>
//         ) : (
//           <Grid container spacing={4}>
//             {rooms.map((room) => (
//               <Grid item key={room.id} xs={12} sm={6} md={4}>
//                 <Card
//                   sx={{
//                     height: "100%",
//                     display: "flex",
//                     flexDirection: "column",
//                     transition: "transform 0.2s, box-shadow 0.2s",
//                     "&:hover": {
//                       transform: "translateY(-4px)",
//                       boxShadow: 6,
//                     },
//                   }}
//                 >
//                   {room.image_url ? (
//                     <CardMedia
//                       component="img"
//                       image={room.image_url}
//                       alt={room.name}
//                       sx={{ height: 200, objectFit: "cover" }}
//                     />
//                   ) : (
//                     <Box
//                       sx={{
//                         height: 200,
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         bgcolor: "grey.200",
//                       }}
//                     >
//                       <Typography variant="body2" color="text.secondary">
//                         No Image
//                       </Typography>
//                     </Box>
//                   )}

//                   <CardContent sx={{ flexGrow: 1 }}>
//                     <Typography variant="h6" gutterBottom>
//                       {room.name}
//                     </Typography>
//                     <Typography
//                       variant="body2"
//                       color="text.secondary"
//                       sx={{
//                         display: "-webkit-box",
//                         overflow: "hidden",
//                         WebkitLineClamp: 2,
//                         WebkitBoxOrient: "vertical",
//                       }}
//                     >
//                       {room.description || "A comfortable room for your stay."}
//                     </Typography>
//                     <Typography
//                       variant="h6"
//                       color="primary"
//                       sx={{ mt: 2, fontWeight: "bold" }}
//                     >
//                       €{room.price} / night
//                     </Typography>
//                   </CardContent>

//                   <CardActions sx={{ p: 2 }}>
//                     <Button
//                       fullWidth
//                       variant="contained"
//                       color="primary"
//                       onClick={() => handleBookRoom(room)}
//                     >
//                       Book Now
//                     </Button>
//                   </CardActions>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         )}
//       </Container>
//     </>
//   );
// };

// export default SearchResults;

//// LATEST <VERSION>
// import React, { useEffect, useState } from "react";
// import { useLocation, Link } from "react-router-dom";
// import { useBooking } from "../context/bookingContext";

// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   Container,
//   Grid,
//   Card,
//   CardMedia,
//   CardContent,
//   CardActions,
//   Button,
//   CircularProgress,
//   Box,
//   Alert,
// } from "@mui/material";
// import HotelIcon from "@mui/icons-material/Hotel";
// import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
// // import BookingForm from "../components/bookingForm/bookingForm";
// // import StickyBox from "../components/stickyComp/stickyComp";

// type Room = {
//   id: string;
//   name: string;
//   description?: string;
//   capacity?: number;
//   price?: number;
//   image_url?: string;
// };

// const SearchResults: React.FC = () => {
//   const location = useLocation();
//   const { searchAvailableRooms } = useBooking();

//   const state = location.state as
//     | {
//         searchParams: { checkIn: string; checkOut: string };
//         availableRooms?: Room[];
//       }
//     | undefined;

//   const [rooms, setRooms] = useState<Room[]>(state?.availableRooms || []);
//   const [loading, setLoading] = useState(!state?.availableRooms);
//   const [error, setError] = useState<string | null>(null);

//   const checkIn = state?.searchParams.checkIn;
//   const checkOut = state?.searchParams.checkOut;

//   useEffect(() => {
//     if (!checkIn || !checkOut || state?.availableRooms) return;

//     const loadRooms = async () => {
//       try {
//         setLoading(true);
//         const result = await searchAvailableRooms(checkIn, checkOut);
//         if (result.success) {
//           setRooms(result.rooms);
//         } else {
//           setError(result.message || "Failed to load rooms");
//         }
//       } catch (err) {
//         setError("An unexpected error occurred.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadRooms();
//   }, [checkIn, checkOut, searchAvailableRooms, state?.availableRooms]);

//   const handleBookRoom = async (room: Room) => {
//     if (!checkIn || !checkOut) {
//       alert("Invalid dates.");
//       return;
//     }

//     // ✅ prevent double-click
//     if (bookingStatus[room.id]) return;

//     setBookingStatus((prev) => ({ ...prev, [room.id]: true }));

//     const { success, message } = await bookRoom({
//       room_id: room.name,
//       check_in: checkIn,
//       check_out: checkOut,
//       guests: 1,
//     });

//     if (success) {
//       alert(`✅ Room "${room.name}" booked successfully!`);
//     } else {
//       alert(`❌ Failed to book room: ${message}`);
//     }

//     // Re-enable button (or keep disabled if you prefer)
//     setBookingStatus((prev) => ({ ...prev, [room.id]: false }));
//   };

//   return (
//     <>
//       {/* HEADER */}

//       <AppBar position="static" color="primary" elevation={2}>
//         <Toolbar>
//           <HotelIcon sx={{ mr: 1 }} />
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             Search Results
//           </Typography>
//           {checkIn && checkOut && (
//             <Box display="flex" alignItems="center" gap={1}>
//               <CalendarMonthIcon />
//               <Typography variant="body2">
//                 {checkIn} → {checkOut}
//               </Typography>
//             </Box>
//           )}
//         </Toolbar>
//       </AppBar>

//       {/* MAIN CONTENT */}
//       <Container sx={{ py: 6 }}>
//         {loading ? (
//           <Box display="flex" justifyContent="center" mt={10}>
//             <CircularProgress />
//           </Box>
//         ) : error ? (
//           <Alert severity="error">{error}</Alert>
//         ) : rooms.length === 0 ? (
//           <Box textAlign="center" mt={10}>
//             <Typography variant="h6" color="text.secondary" gutterBottom>
//               No rooms available for these dates.
//             </Typography>
//             <Button
//               component={Link}
//               to="/"
//               variant="contained"
//               color="primary"
//               sx={{ mt: 2 }}
//             >
//               Try New Dates
//             </Button>
//           </Box>
//         ) : (
//           <Grid container spacing={4}>
//             {rooms.map((room) => (
//               <Grid item key={room.id} xs={12} sm={6} md={4}>
//                 <Card
//                   sx={{
//                     height: "100%",
//                     display: "flex",
//                     flexDirection: "column",
//                     transition: "transform 0.2s, box-shadow 0.2s",
//                     "&:hover": {
//                       transform: "translateY(-4px)",
//                       boxShadow: 6,
//                     },
//                   }}
//                 >
//                   {room.image_url ? (
//                     <CardMedia
//                       component="img"
//                       image={room.image_url}
//                       alt={room.name}
//                       sx={{ height: 200, objectFit: "cover" }}
//                     />
//                   ) : (
//                     <Box
//                       sx={{
//                         height: 200,
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         bgcolor: "grey.200",
//                       }}
//                     >
//                       <Typography variant="body2" color="text.secondary">
//                         No Image
//                       </Typography>
//                     </Box>
//                   )}

//                   <CardContent sx={{ flexGrow: 1 }}>
//                     <Typography variant="h6" gutterBottom>
//                       {room.name}
//                     </Typography>
//                     <Typography
//                       variant="body2"
//                       color="text.secondary"
//                       sx={{
//                         display: "-webkit-box",
//                         overflow: "hidden",
//                         WebkitLineClamp: 2,
//                         WebkitBoxOrient: "vertical",
//                       }}
//                     >
//                       {room.description || "A comfortable room for your stay."}
//                     </Typography>
//                     <Typography
//                       variant="h6"
//                       color="primary"
//                       sx={{ mt: 2, fontWeight: "bold" }}
//                     >
//                       €{room.price} / night
//                     </Typography>
//                   </CardContent>

//                   <CardActions sx={{ p: 2 }}>
//                     <Button
//                       fullWidth
//                       variant="contained"
//                       color="primary"
//                       component={Link}
//                       to={`/room/${room.id}`} // Link to the room details page
//                     >
//                       View Details
//                     </Button>
//                   </CardActions>
//                 </Card>
//               </Grid>
//             ))}
//           </Grid>
//         )}
//       </Container>
//     </>
//   );
// };

// export default SearchResults;

import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { useBooking } from "../context/bookingContext";

import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  CircularProgress,
  Box,
  Alert,
} from "@mui/material";
import HotelIcon from "@mui/icons-material/Hotel";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";

type Booking = {
  check_in: string;
  check_out: string;
};

type Room = {
  id: string;
  name: string;
  description?: string;
  capacity?: number;
  price?: number;
  image_url?: string;
  bookings?: Booking[]; // existing bookings for this room
};

const SearchResults: React.FC = () => {
  const location = useLocation();
  const { searchAvailableRooms } = useBooking();

  const state = location.state as
    | {
        searchParams: { checkIn: string; checkOut: string };
        availableRooms?: Room[];
      }
    | undefined;

  const [rooms, setRooms] = useState<Room[]>(state?.availableRooms || []);
  const [loading, setLoading] = useState(!state?.availableRooms);
  const [error, setError] = useState<string | null>(null);

  const checkIn = state?.searchParams.checkIn;
  const checkOut = state?.searchParams.checkOut;

  // Helper function to detect overlapping bookings
  const bookingsOverlap = (
    startA: string,
    endA: string,
    startB: string,
    endB: string
  ) => {
    const aStart = new Date(startA).getTime();
    const aEnd = new Date(endA).getTime();
    const bStart = new Date(startB).getTime();
    const bEnd = new Date(endB).getTime();
    return aStart < bEnd && bStart < aEnd;
  };

  useEffect(() => {
    if (!checkIn || !checkOut || state?.availableRooms) return;

    // const loadRooms = async () => {
    //   try {
    //     setLoading(true);
    //     const result = await searchAvailableRooms(checkIn, checkOut);
    //     if (result.success) {
    //       // Filter out rooms that have overlapping bookings
    //       const available = result.rooms.filter((room: Room) => {
    //         return !room.bookings?.some((b: Booking) =>
    //           bookingsOverlap(checkIn, checkOut, b.check_in, b.check_out)
    //         );
    //       });
    //       setRooms(available);
    //     } else {
    //       setError(result.message || "Failed to load rooms");
    //     }
    //   } catch (err) {
    //     setError("An unexpected error occurred.");
    //   } finally {
    //     setLoading(false);
    //   }
    // };

    const loadRooms = async () => {
      try {
        setLoading(true);
        const result = await searchAvailableRooms(checkIn, checkOut);

        if (result.success) {
          setRooms(result.rooms);
        } else {
          setError(result.message || "Failed to load rooms");
        }
      } catch (err) {
        setError("An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    loadRooms();
  }, [checkIn, checkOut, searchAvailableRooms, state?.availableRooms]);

  return (
    <>
      {/* HEADER */}
      <AppBar position="static" color="primary" elevation={2}>
        <Toolbar>
          <HotelIcon sx={{ mr: 1 }} />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Search Results
          </Typography>
          {checkIn && checkOut && (
            <Box display="flex" alignItems="center" gap={1}>
              <CalendarMonthIcon />
              <Typography variant="body2">
                {checkIn} → {checkOut}
              </Typography>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* MAIN CONTENT */}
      <Container sx={{ py: 6 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" mt={10}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : rooms.length === 0 ? (
          <Box textAlign="center" mt={10}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No rooms available for these dates.
            </Typography>
            <Button
              component={Link}
              to="/"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Try New Dates
            </Button>
          </Box>
        ) : (
          <Grid container spacing={4}>
            {rooms.map((room) => (
              <Grid item key={room.id} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: 6,
                    },
                  }}
                >
                  {room.image_url ? (
                    <CardMedia
                      component="img"
                      image={room.image_url}
                      alt={room.name}
                      sx={{ height: 200, objectFit: "cover" }}
                    />
                  ) : (
                    <Box
                      sx={{
                        height: 200,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        bgcolor: "grey.200",
                      }}
                    >
                      <Typography variant="body2" color="text.secondary">
                        No Image
                      </Typography>
                    </Box>
                  )}

                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {room.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        display: "-webkit-box",
                        overflow: "hidden",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {room.description || "A comfortable room for your stay."}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="primary"
                      sx={{ mt: 2, fontWeight: "bold" }}
                    >
                      €{room.price} / night
                    </Typography>
                  </CardContent>

                  <CardActions sx={{ p: 2 }}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      component={Link}
                      to={`/room/${room.id}`} // Link to the room details page
                    >
                      View Details
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </>
  );
};

export default SearchResults;
