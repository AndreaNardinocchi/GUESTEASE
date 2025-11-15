// import React, { useContext } from "react";
// import { AuthContext } from "../context/authContext";
// import { Box, Button, Typography, Stack, Paper } from "@mui/material";

// const AdminDashboard: React.FC = () => {
//   const auth = useContext(AuthContext);

//   // Protect non-admins
//   if (!auth?.user || auth.user.role !== "admin") {
//     return (
//       <Box textAlign="center" mt={10}>
//         <Typography variant="h5" color="error">
//           Access Denied
//         </Typography>
//         <Typography>You are not an admin.</Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box p={4}>
//       <Typography variant="h4" gutterBottom>
//         Admin Dashboard
//       </Typography>
//       <Typography variant="subtitle1" gutterBottom>
//         Welcome, {auth.user.firstName}!
//       </Typography>

//       <Stack spacing={2} direction="row" mt={4}>
//         <Button variant="contained" color="primary">
//           Manage Reservations
//         </Button>
//         <Button variant="contained" color="secondary">
//           View Users
//         </Button>
//         <Button variant="contained" color="success">
//           System Settings
//         </Button>
//       </Stack>

//       <Paper elevation={2} sx={{ mt: 6, p: 3 }}>
//         <Typography variant="h6">Quick Stats</Typography>
//         <Typography>Total Reservations: 42</Typography>
//         <Typography>Registered Users: 123</Typography>
//       </Paper>
//     </Box>
//   );
// };

// export default AdminDashboard;

//

// src/pages/AdminDashboard.tsx
// import { useEffect, useState } from "react";
// import { createClient } from "@supabase/supabase-js";

// const supabase = createClient(
//   import.meta.env.VITE_SUPABASE_URL!,
//   import.meta.env.VITE_SUPABASE_ANON_KEY!
// );

// const AdminDashboard = () => {
//   const [bookings, setBookings] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const { data, error } = await supabase.from("bookings").select("*");
//         if (error) throw error;
//         setBookings(data || []);
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchBookings();
//   }, []);

//   if (loading) return <p>Loading bookings...</p>;
//   if (error) return <p style={{ color: "red" }}>{error}</p>;

//   return (
//     <div>
//       <h2>All Bookings</h2>
//       {bookings.length === 0 && <p>No bookings found.</p>}
//       <ul>
//         {bookings.map((b: any) => (
//           <li key={b.id}>
//             Booking ID: {b.id} — Check-in: {b.check_in} — Check-out:{" "}
//             {b.check_out}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default AdminDashboard;

// import { useEffect, useState } from "react";
// import { createClient } from "@supabase/supabase-js";
// import {
//   Box,
//   Button,
//   CircularProgress,
//   Container,
//   List,
//   ListItem,
//   ListItemText,
//   Typography,
//   Paper,
//   Stack,
// } from "@mui/material";

// const supabase = createClient(
//   import.meta.env.VITE_SUPABASE_URL!,
//   import.meta.env.VITE_SUPABASE_ANON_KEY!
// );

// const AdminDashboard = () => {
//   const [bookings, setBookings] = useState<any[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   // useEffect(() => {
//   //   const fetchBookings = async () => {
//   //     try {
//   //       const { data, error } = await supabase.from("bookings").select("*");
//   //       if (error) throw error;
//   //       setBookings(data || []);
//   //     } catch (err: any) {
//   //       setError(err.message);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };
//   //   fetchBookings();
//   // }, []);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const { data, error } = await supabase.from("bookings").select("*"); // ← IMPORTANT: no join

//         if (error) throw error;
//         setBookings(data || []);
//       } catch (err: any) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, []);

//   // useEffect(() => {
//   //   const fetchBookings = async () => {
//   //     try {
//   //       const { data, error } = await supabase.from("bookings").select(`
//   //         *,
//   //         user:user_id (
//   //           id,
//   //           email
//   //         )
//   //       `);

//   //       if (error) throw error;
//   //       setBookings(data || []);
//   //     } catch (err: any) {
//   //       setError(err.message);
//   //     } finally {
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchBookings();
//   // }, []);

//   const handleCreate = () => {
//     alert("Create booking clicked");
//   };

//   const handleUpdate = (id: string) => {
//     alert(`Update booking ${id}`);
//   };

//   const handleCancel = (id: string) => {
//     alert(`Cancel booking ${id}`);
//   };

//   if (loading)
//     return (
//       <Container>
//         <Box textAlign="center" mt={4}>
//           <CircularProgress />
//           <Typography mt={2}>Loading bookings...</Typography>
//         </Box>
//       </Container>
//     );

//   if (error)
//     return (
//       <Container>
//         <Box textAlign="center" mt={4}>
//           <Typography color="error">{error}</Typography>
//         </Box>
//       </Container>
//     );

//   return (
//     <Container>
//       <Box my={4}>
//         <Typography variant="h4" gutterBottom>
//           Admin Dashboard
//         </Typography>
//         <Button variant="contained" color="primary" onClick={handleCreate}>
//           Create Booking
//         </Button>
//       </Box>

//       {bookings.length === 0 ? (
//         <Typography>No bookings found.</Typography>
//       ) : (
//         <List>
//           {bookings.map((b) => (
//             <Paper key={b.id} sx={{ mb: 2, p: 2 }}>
//               <Stack
//                 direction="row"
//                 justifyContent="space-between"
//                 alignItems="center"
//               >
//                 <ListItemText
//                   primary={`Booking ID: ${b.id}`}
//                   secondary={`Room: ${b.room_id} — Check-in: ${b.check_in} — Check-out: ${b.check_out} — Guests: ${b.guests}`}
//                 />
//                 <Stack direction="row" spacing={1}>
//                   <Button
//                     variant="outlined"
//                     color="info"
//                     onClick={() => handleUpdate(b.id)}
//                   >
//                     Update
//                   </Button>
//                   <Button
//                     variant="outlined"
//                     color="error"
//                     onClick={() => handleCancel(b.id)}
//                   >
//                     Cancel
//                   </Button>
//                 </Stack>
//               </Stack>
//             </Paper>
//           ))}
//         </List>
//       )}
//     </Container>
//   );
// };

// export default AdminDashboard;

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL!,
  import.meta.env.VITE_SUPABASE_ANON_KEY!
);

interface Booking {
  id: string;
  room_id: string;
  user_id: string;
  user_email: string;
  check_in: string;
  check_out: string;
  guests: number;
  created_at: string;
  first_name: string;
}

const AdminDashboard = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        // 1️⃣ Get current user
        const { data: userData, error: userError } =
          await supabase.auth.getUser();
        if (userError) throw userError;
        if (!userData.user) throw new Error("Not authenticated");

        const role = userData.user.user_metadata?.role;
        if (role !== "admin") {
          setIsAdmin(false);
          setError("You are not authorized to view this page.");
          return;
        }
        setIsAdmin(true);

        // 2️⃣ Fetch all bookings via the RPC function
        const { data: bookingsData, error: bookingsError } = await supabase.rpc(
          "get_all_bookings"
        );

        if (bookingsError) throw bookingsError;

        setBookings((bookingsData as Booking[]) || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading)
    return (
      <Container>
        <Box textAlign="center" mt={4}>
          <CircularProgress />
          <Typography mt={2}>Loading bookings...</Typography>
        </Box>
      </Container>
    );

  if (error)
    return (
      <Container>
        <Box textAlign="center" mt={4}>
          <Typography color="error">{error}</Typography>
        </Box>
      </Container>
    );

  if (!isAdmin)
    return (
      <Container>
        <Box textAlign="center" mt={4}>
          <Typography color="error">You are not authorized.</Typography>
        </Box>
      </Container>
    );

  return (
    <Container>
      <Box my={4}>
        <Typography variant="h4" gutterBottom>
          Admin Dashboard
        </Typography>
      </Box>

      {bookings.length === 0 ? (
        <Typography>No bookings found.</Typography>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Booking ID</TableCell>
                <TableCell>Room ID</TableCell>
                <TableCell>First Name</TableCell>
                <TableCell>User Email</TableCell>
                <TableCell>Check-in</TableCell>
                <TableCell>Check-out</TableCell>
                <TableCell>Guests</TableCell>
                <TableCell>Created At</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {bookings.map((b) => (
                <TableRow key={b.id}>
                  <TableCell>{b.id}</TableCell>
                  <TableCell>{b.room_id}</TableCell>
                  <TableCell>{b.first_name}</TableCell>
                  <TableCell>{b.user_email}</TableCell>
                  <TableCell>{b.check_in}</TableCell>
                  <TableCell>{b.check_out}</TableCell>
                  <TableCell>{b.guests}</TableCell>
                  <TableCell>
                    {new Date(b.created_at).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default AdminDashboard;
