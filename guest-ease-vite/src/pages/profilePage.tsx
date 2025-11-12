// import React from "react";
// import {
//   Box,
//   Typography,
//   Grid,
//   TextField,
//   Button,
//   Card,
//   CardMedia,
//   Stack,
// } from "@mui/material";
// import { useAuth } from "../context/useAuth";

// const ProfilePage: React.FC = () => {
//   const { user } = useAuth();

//   if (!user) {
//     return (
//       <Box textAlign="center" mt={4}>
//         <Typography variant="h6">
//           Please log in to view your profile.
//         </Typography>
//       </Box>
//     );
//   }

//   const handleUpdateProfile = () => {
//     alert("Update profile clicked!");
//   };

//   const handleDeleteAccount = () => {
//     const confirmed = window.confirm(
//       "Are you sure you want to delete your account?"
//     );
//     if (confirmed) {
//       alert("Account deleted!");
//     }
//   };

//   return (
//     <Box maxWidth="1000px" mx="auto" mt={4} px={2}>
//       <Typography variant="h4" align="center" sx={{ color: "#8E4585", mb: 4 }}>
//         My Profile
//       </Typography>

//       <Grid container spacing={4}>
//         {/* Left Column: User Info */}
//         <Grid item xs={12} md={6}>
//           <Stack spacing={2}>
//             <TextField
//               label="First Name"
//               value={user.firstName}
//               fullWidth
//               InputProps={{ readOnly: true }}
//             />
//             <TextField
//               label="Last Name"
//               value={user.lastName}
//               fullWidth
//               InputProps={{ readOnly: true }}
//             />
//             <TextField
//               label="Email"
//               value={user.email}
//               fullWidth
//               InputProps={{ readOnly: true }}
//             />
//             <TextField
//               label="Phone"
//               value={user.phone || ""}
//               fullWidth
//               InputProps={{ readOnly: true }}
//             />
//             <TextField
//               label="Joined"
//               value={new Date(user.created_at || "").toLocaleDateString()}
//               fullWidth
//               InputProps={{ readOnly: true }}
//             />

//             <Stack direction="row" spacing={2} mt={2}>
//               <Button
//                 variant="contained"
//                 color="secondary"
//                 onClick={handleUpdateProfile}
//                 fullWidth
//               >
//                 Update Profile
//               </Button>
//               <Button
//                 variant="outlined"
//                 color="error"
//                 onClick={handleDeleteAccount}
//                 fullWidth
//               >
//                 Delete Account
//               </Button>
//             </Stack>
//           </Stack>
//         </Grid>

//         {/* Right Column: Placeholder Image */}
//         <Grid item xs={12} md={6}>
//           <Card sx={{ borderRadius: 3, overflow: "hidden" }}>
//             <CardMedia
//               component="img"
//               image="https://via.placeholder.com/500x400?text=Profile+Image"
//               alt="Profile placeholder"
//               sx={{ height: "100%", objectFit: "cover" }}
//             />
//           </Card>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// };

// export default ProfilePage;

import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { useAuth } from "../context/useAuth";
import SubNav from "../components/accountSubNav/accountSubNav";

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    country: user?.country || "",
  });

  if (!user) {
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6">
          Please log in to view your profile.
        </Typography>
      </Box>
    );
  }

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    console.log("Updated user data:", formData);
    // TODO: Call update API here
    handleClose();
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmed) {
      alert("Account deleted!");
      // TODO: Call delete API
    }
  };

  return (
    // <Box maxWidth="1000px" mx="auto" mt={4} px={2}>
    <Box maxWidth="1200px" mx="auto" mt={4} px={2}>
      <SubNav />
      <Typography variant="h4" align="center" sx={{ color: "#8E4585", mb: 4 }}>
        My Profile
      </Typography>

      <Grid container spacing={4}>
        {/* Left Column: Profile Data */}
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Typography>
              <strong>First Name:</strong> {user.firstName}
            </Typography>
            <Typography>
              <strong>Last Name:</strong> {user.lastName}
            </Typography>
            <Typography>
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography>
              <strong>Country:</strong> {user.country || "-"}
            </Typography>
            <Typography>
              <strong>Role:</strong> {user.role || "-"}
            </Typography>
            <Typography>
              <strong>Joined:</strong>{" "}
              {new Date(user.createdAt || "").toLocaleDateString()}
            </Typography>

            <Stack direction="row" spacing={2} mt={2}>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleOpen}
                fullWidth
              >
                Update Profile
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={handleDeleteAccount}
                fullWidth
              >
                Delete Account
              </Button>
            </Stack>
          </Stack>
        </Grid>

        {/* Right Column: Placeholder Image */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, overflow: "hidden" }}>
            <CardMedia
              component="img"
              image="https://via.placeholder.com/500x400?text=Profile+Image"
              alt="Profile placeholder"
              sx={{ height: "100%", objectFit: "cover" }}
            />
          </Card>
        </Grid>
      </Grid>

      {/* Update Profile Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Update Profile</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="First Name"
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              fullWidth
            />
            <TextField
              label="Last Name"
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              fullWidth
            />
            <TextField
              label="Email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              fullWidth
            />
            <TextField
              label="Phone"
              value={formData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" color="secondary" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ProfilePage;
