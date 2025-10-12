import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Alert,
  Box,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { supabase } from "./supabaseClient";

// Type for booking record
interface Booking {
  id: number;
  guest_name: string;
  room_name: string;
}

const rooms = [
  { id: 1, name: "Room 101" },
  { id: 2, name: "Room 102" },
  { id: 3, name: "Room 103" },
];

const App = () => {
  const [guestName, setGuestName] = useState<string>("");
  const [selectedRoom, setSelectedRoom] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from<Booking>("bookings")
      .select("*");
    if (error) console.error(error);
    else setBookings(data || []);
  };

  const handleBooking = async () => {
    setMessage("");
    setError("");

    if (!guestName || !selectedRoom) {
      setError("Please enter your name and select a room.");
      return;
    }

    const { data, error } = await supabase
      .from<Booking>("bookings")
      .insert([{ guest_name: guestName, room_name: selectedRoom }]);

    if (error) {
      console.error(error);
      setError("Failed to save booking");
    } else {
      setMessage(`${guestName} booked ${selectedRoom}`);
      setGuestName("");
      setSelectedRoom("");
      fetchBookings();
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        GuestEase (Supabase + TypeScript)
      </Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
        <TextField
          label="Your Name"
          variant="outlined"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          fullWidth
        />
        <FormControl fullWidth>
          <InputLabel>Room</InputLabel>
          <Select
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
            label="Room"
          >
            {rooms.map((room) => (
              <MenuItem key={room.id} value={room.name}>
                {room.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Button
        variant="contained"
        color="primary"
        onClick={handleBooking}
        fullWidth
      >
        Book
      </Button>

      {message && (
        <Alert severity="success" sx={{ mt: 2 }}>
          {message}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      <Typography variant="h6" sx={{ mt: 4 }}>
        All Bookings
      </Typography>
      <List>
        {bookings.map((b) => (
          <ListItem key={b.id}>
            <ListItemText primary={`${b.guest_name} → ${b.room_name}`} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default App;
