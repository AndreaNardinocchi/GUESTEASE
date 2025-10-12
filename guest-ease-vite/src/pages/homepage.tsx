// import React from "react";
// import { Container, Typography, Box } from "@mui/material";
// import BookingForm from "../components/bookingForm/bookingForm";
// import StickyBox from "../components/stickyComp/stickyComp";

// const HomePage: React.FC = () => {
//   return (
//     <>
//       <Container
//         maxWidth="md"
//         // sx={{ mt: 14 /* 64px nav + ~50px sticky box height */ }}
//       >
//         <Box textAlign="center" mb={5}>
//           <Typography variant="h2" component="h1" gutterBottom>
//             Welcome to GuestEase
//           </Typography>

//           <Typography variant="h5" color="textSecondary" paragraph>
//             Your comfort is our priority. Nestled in a peaceful location, our
//             guesthouse offers cozy rooms, friendly service, and a relaxing
//             atmosphere.
//           </Typography>
//         </Box>
//       </Container>
//       {/* Sticky box below nav */}
//       <StickyBox>
//         <BookingForm />
//       </StickyBox>

//       {/* Push content down so it doesn't hide behind sticky elements */}
//       <Container
//         maxWidth="md"
//         sx={{ mt: 14 /* 64px nav + ~50px sticky box height */ }}
//       >
//         <Box textAlign="center" mb={5}>
//           {/* <Typography variant="h2" component="h1" gutterBottom>
//             Welcome to GuestEase
//           </Typography>
//           <Typography variant="h5" color="textSecondary" paragraph>
//             Your comfort is our priority. Nestled in a peaceful location, our
//             guesthouse offers cozy rooms, friendly service, and a relaxing
//             atmosphere.
//           </Typography> */}
//           <Typography variant="body1" paragraph>
//             Whether you're traveling for business or pleasure, GuestEase ensures
//             a pleasant stay with clean, well-equipped rooms, fast Wi-Fi, and
//             complimentary breakfast. Choose from a range of room options and
//             enjoy facilities designed for your convenience.
//           </Typography>
//         </Box>

//         <Box mt={8}>
//           <Typography variant="h4" gutterBottom>
//             Why Choose GuestEase?
//           </Typography>
//           <ul style={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
//             <li>✔️ Comfortable and clean accommodations</li>
//             <li>✔️ Fast and free Wi-Fi</li>
//             <li>✔️ Central location with easy access</li>
//             <li>✔️ Friendly and attentive staff</li>
//             <li>✔️ Affordable rates with flexible booking</li>
//           </ul>
//         </Box>
//       </Container>
//     </>
//   );
// };

// export default HomePage;

import React from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import BookingForm from "../components/bookingForm/bookingForm";
import StickyBox from "../components/stickyComp/stickyComp";

const rooms = [
  {
    id: 1,
    name: "Room 101",
    description: "Cozy single room with all essentials and a great view.",
    image:
      "https://images.unsplash.com/photo-1501117716987-c8e8c0d0e3b8?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Room 102",
    description: "Spacious double room with modern amenities and balcony.",
    image:
      "https://images.unsplash.com/photo-1560448070-5cbdac6eaa7e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "Room 103",
    description: "Deluxe suite with king-sized bed and luxurious bathroom.",
    image:
      "https://images.unsplash.com/photo-1551918120-973ff7851f76?auto=format&fit=crop&w=800&q=80",
  },
];

const HomePage: React.FC = () => {
  return (
    <>
      <Container maxWidth="md">
        <Box textAlign="center" mb={5} sx={{ mt: 4 }}>
          <Typography variant="h2" component="h1" gutterBottom>
            Welcome to GuestEase
          </Typography>

          <Typography variant="h5" color="textSecondary" paragraph>
            Your comfort is our priority. Nestled in a peaceful location, our
            guesthouse offers cozy rooms, friendly service, and a relaxing
            atmosphere.
          </Typography>
        </Box>
      </Container>

      {/* Sticky box below nav */}
      <StickyBox>
        <BookingForm />
      </StickyBox>

      {/* Main content container */}
      <Container maxWidth="md" sx={{ mt: 14 }}>
        <Box textAlign="center" mb={5}>
          <Typography variant="body1" paragraph>
            Whether you're traveling for business or pleasure, GuestEase ensures
            a pleasant stay with clean, well-equipped rooms, fast Wi-Fi, and
            complimentary breakfast. Choose from a range of room options and
            enjoy facilities designed for your convenience.
          </Typography>
        </Box>

        <Box mb={6}>
          <Typography variant="h4" gutterBottom>
            Why Choose GuestEase?
          </Typography>
          <ul style={{ fontSize: "1.1rem", lineHeight: 1.8 }}>
            <li>✔️ Comfortable and clean accommodations</li>
            <li>✔️ Fast and free Wi-Fi</li>
            <li>✔️ Central location with easy access</li>
            <li>✔️ Friendly and attentive staff</li>
            <li>✔️ Affordable rates with flexible booking</li>
          </ul>
        </Box>

        {/* Room Cards Section */}
        <Box mb={8}>
          <Typography variant="h4" gutterBottom>
            Our Rooms
          </Typography>

          <Grid container spacing={4}>
            {rooms.map((room) => (
              <Grid item xs={12} sm={6} md={4} key={room.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={room.image}
                    alt={room.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="h2" gutterBottom>
                      {room.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {room.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" color="primary">
                      View Details
                    </Button>
                    <Button size="small" color="primary">
                      Book Now
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;
