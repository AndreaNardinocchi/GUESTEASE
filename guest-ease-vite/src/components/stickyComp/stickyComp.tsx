import React from "react";
import { Box } from "@mui/material";

interface StickyNavigationBarProps {
  children: React.ReactNode;
}

const StickyBox: React.FC<StickyNavigationBarProps> = ({ children }) => {
  return (
    // <Box
    //   sx={{
    //     position: "sticky",
    //     top: "64px", // Adjust this to your nav bar height
    //     left: 0,
    //     width: "100%",
    //     zIndex: 1200,
    //     backgroundColor: "#e26d5c;", // Peachy Glow
    //     boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.06)",
    //     padding: {
    //       xs: "12px 16px",
    //       sm: "16px 24px",
    //       md: "20px 32px",
    //     },
    //   }}
    // >
    //   <Box maxWidth="md" mx="auto">
    //     {children}
    //   </Box>
    // </Box>

    <Box
      sx={{
        position: "sticky",
        // top: "64px",
        top: 0, // stick to top of viewport
        left: 0,
        width: "100%",
        zIndex: 1200,
        backgroundColor: "#e26d5c",
        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.06)",
        // padding: { xs: "8px 12px", sm: "12px 16px", md: "16px 24px" },
      }}
    >
      {/* <Box
        sx={{
          width: "100%", // full width on all screens
          maxWidth: "100%", // prevent horizontal overflow
          margin: 0, // remove automatic margin
          boxSizing: "border-box",
        }}
      >
        {children}
      </Box> */}

      <Box maxWidth="md" mx="auto">
        {children}
      </Box>
    </Box>
  );
};

export default StickyBox;
