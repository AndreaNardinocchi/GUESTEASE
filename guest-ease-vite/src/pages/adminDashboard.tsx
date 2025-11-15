import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Box, Button, Typography, Stack, Paper } from "@mui/material";

const AdminDashboard: React.FC = () => {
  const auth = useContext(AuthContext);

  // Protect non-admins
  if (!auth?.user || auth.user.role !== "admin") {
    return (
      <Box textAlign="center" mt={10}>
        <Typography variant="h5" color="error">
          Access Denied
        </Typography>
        <Typography>You are not an admin.</Typography>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Welcome, {auth.user.firstName}!
      </Typography>

      <Stack spacing={2} direction="row" mt={4}>
        <Button variant="contained" color="primary">
          Manage Reservations
        </Button>
        <Button variant="contained" color="secondary">
          View Users
        </Button>
        <Button variant="contained" color="success">
          System Settings
        </Button>
      </Stack>

      <Paper elevation={2} sx={{ mt: 6, p: 3 }}>
        <Typography variant="h6">Quick Stats</Typography>
        <Typography>Total Reservations: 42</Typography>
        <Typography>Registered Users: 123</Typography>
      </Paper>
    </Box>
  );
};

export default AdminDashboard;
