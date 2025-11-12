import React from "react";
import {
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Stack,
} from "@mui/material";
import SubNav from "../components/accountSubNav/accountSubNav";

const FavoritesPage: React.FC = () => {
  // Placeholder favorite rooms
  const favoriteRooms = [
    {
      id: "room1",
      name: "Cozy Apartment",
      image: "https://via.placeholder.com/400x250?text=Room+1",
    },
    {
      id: "room2",
      name: "Beach House",
      image: "https://via.placeholder.com/400x250?text=Room+2",
    },
  ];

  const handleRemove = (id: string) => {
    alert(`Removed room ${id} from favorites`);
    // TODO: implement remove from favorites logic
  };

  return (
    <Box maxWidth="1200px" mx="auto" mt={4} px={2}>
      <SubNav />
      <Typography variant="h4" align="center" sx={{ color: "#8E4585", mb: 4 }}>
        My Favorites
      </Typography>

      {favoriteRooms.length === 0 ? (
        <Typography align="center">You have no favorite rooms yet.</Typography>
      ) : (
        <Grid container spacing={4}>
          {favoriteRooms.map((room) => (
            <Grid item xs={12} sm={6} key={room.id}>
              <Card
                sx={{ borderRadius: 3, overflow: "hidden", height: "100%" }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={room.image}
                  alt={room.name}
                />
                <CardContent>
                  <Typography variant="h6">{room.name}</Typography>
                  <Stack direction="row" spacing={1} mt={2}>
                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleRemove(room.id)}
                    >
                      Remove
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default FavoritesPage;
