import { useState } from "react";
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

const rooms = [
  { id: 1, name: "Room 101" },
  { id: 2, name: "Room 102" },
  { id: 3, name: "Room 103" },
];

function App() {
  const [guestName, setGuestName] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleBooking = async () => {
    setMessage("");
    setError("");

    if (!guestName || !selectedRoom) {
      setError("Please enter your name and select a room.");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ guestName, roomName: selectedRoom }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(`${data.booking.guestName} booked ${data.booking.roomName}`);
        setGuestName("");
        setSelectedRoom("");
      } else {
        setError(data.message || "Error submitting booking");
      }
    } catch {
      setError("Failed to connect to the server");
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Typography variant="h4" gutterBottom>
        GuestEase Demo
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
        Available Rooms
      </Typography>
      <List>
        {rooms.map((room) => (
          <ListItem key={room.id}>
            <ListItemText primary={room.name} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
}

export default App;

/*

Exactly — good catch 👏

The version I gave you earlier used a simple in-memory Express backend, just to get everything running easily.

If you want to connect Supabase instead of keeping bookings in memory, we can do that in a few clean steps — and it’ll still stay very lightweight.

Here’s how to add Supabase properly:

🧩 Step 1: Set up a Supabase project

Go to https://supabase.com

Create a free account

Create a new project (name it guestease)

Inside Table Editor, make a table called bookings with these columns:

Column	Type	Notes
id	bigint	Primary key (auto increment)
guest_name	text	
room_name	text	

Go to Project Settings → API, and copy your:

Project URL

anon public API key

🧰 Step 2: Install Supabase client in the frontend

In your frontend folder, run:

npm install @supabase/supabase-js

🗝️ Step 3: Create a supabaseClient.js

Inside frontend/src/, make a new file called supabaseClient.js:

import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = "https://your-project-url.supabase.co"
const SUPABASE_KEY = "your-anon-key"

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)


(Replace the values with your actual Supabase credentials.)

⚛️ Step 4: Update App.js to use Supabase

Here’s the new version of your App.js that saves bookings to Supabase instead of the Express backend:

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

function App() {
  const [guestName, setGuestName] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [bookings, setBookings] = useState([]);

  const rooms = [
    { id: 1, name: "Room 101" },
    { id: 2, name: "Room 102" },
    { id: 3, name: "Room 103" },
  ];

  // Fetch existing bookings
  useEffect(() => {
    fetchBookings();
  }, []);

  async function fetchBookings() {
    const { data, error } = await supabase.from("bookings").select("*");
    if (error) console.error(error);
    else setBookings(data);
  }

  const handleBooking = async () => {
    setMessage("");
    setError("");

    if (!guestName || !selectedRoom) {
      setError("Please enter your name and select a room.");
      return;
    }

    const { data, error } = await supabase
      .from("bookings")
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
        GuestEase (Supabase Demo)
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

      <Button variant="contained" color="primary" onClick={handleBooking} fullWidth>
        Book
      </Button>

      {message && <Alert severity="success" sx={{ mt: 2 }}>{message}</Alert>}
      {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

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
}

export default App;

🚀 Step 5: Run the app again
npm start


Now when you submit a booking, it will be saved directly in Supabase — no backend server needed!

Would you like me to show you how to secure your Supabase connection (environment variables) next, so your keys aren’t visible in the code?

*/
