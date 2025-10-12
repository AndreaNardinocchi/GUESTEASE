const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

let bookings = [];

// Sample endpoint
app.get("/", (req, res) => {
  res.send("GuestEase Backend Running");
});

// POST: create a booking
app.post("/bookings", (req, res) => {
  const { guestName, roomName } = req.body;

  if (!guestName || !roomName) {
    return res.status(400).json({ message: "Missing name or room" });
  }

  const newBooking = { id: bookings.length + 1, guestName, roomName };
  bookings.push(newBooking);

  res.json({ message: "Booking successful", booking: newBooking });
});

app.get("/bookings", (req, res) => {
  res.json(bookings);
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);
