// import React, { useState, type MouseEvent, useContext, useEffect } from "react";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import IconButton from "@mui/material/IconButton";
// import Button from "@mui/material/Button";
// import MenuIcon from "@mui/icons-material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import Menu from "@mui/material/Menu";
// import { styled, useTheme } from "@mui/material/styles";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import { Link, useNavigate } from "react-router-dom";
// // import { AuthContext } from "../../contexts/authContext";
// // https://mui.com/material-ui/material-icons/?selected=Skateboarding
// import SkateboardingIcon from "@mui/icons-material/Skateboarding";
// // The Logout Icon is no longer needed as we are using the UserProfileDrawer
// // which embeds the signout function and icon
// // https://mui.com/material-ui/material-icons/?selected=Logout
// // import LogoutIcon from "@mui/icons-material/Logout";
// // https://mui.com/material-ui/material-icons/?selected=Login
// import LoginIcon from "@mui/icons-material/Login";
// // import UserProfileDrawer from "../UserProfileDrawer";
// // import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
// import LanguageSwitcher from "../languageSwitcher";
// // import { useTranslation } from "react-i18next";
// // import i18n from "../../i18n/i18n";

// // The userName here wouldn't get updated whenever a new sign up occurred
// // hence, we resolved by using useState() and useEffect() below
// // const userName = localStorage.getItem("userFirstName");

// // Creates a div that acts as spacing offset to push content below the fixed AppBar
// // https://mui.com/system/styled/
// const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

// /**
//  * MUI’s theme.mixins.toolbar provides default height and spacing matching the AppBar height.
//  * This component is inserted just after the AppBar so the page content is pushed down,
//  * preventing it from being hidden behind the fixed-position AppBar.
//  */

// const SiteHeader: React.FC = () => {
//   /**
//    * We are using the translation hook gets the t function and i18n instance inside our functional component.
//    * However, i18n is already embedded into the <LanguageSwitcher /> component
//    * https://react.i18next.com/latest/usetranslation-hook
//    */
// //   const { t } = useTranslation();
// //   console.log("Current language:", i18n.language);

// //   const { token } = useContext(AuthContext) || {};
// //   const { user } = useContext(AuthContext) || {};

//   /**
//    * Declare a state variable `userName` with a default value "User"
//    * `setUserName` is the function used to update this state
//    * */
//   const [userName, setUserName] = useState("User");

//   // This useEffect runs when the component mounts or whenever `token` changes
//   useEffect(
//     () => {
//       // Get the 'userFirstName' or 'Usaer' fall back if not found
//       //  const name = localStorage.getItem("userFirstName") || "User";

//       // Update the userName state with the value from supabase or fallback to 'User'
//       setUserName(user?.firstName ?? "User");
//     },
//     // Run this effect every time `token` changes ensuring the 'userFirstName' is up-to-date
//     [token, user]
//   );

//   console.log("SiteHeader token:", token);

//   /**
//    * This hook gives us access to a function that can change the current URL programmatically,
//    * without needing <Link> components. Useful for menu navigation handlers.
//    */
//   const navigate = useNavigate();

//   /**
//    * Provides access to the Material UI theme object, which holds styling info like colors,
//    * typography, breakpoints, and mixins. Here, we use it to get responsive breakpoint info.
//    */
//   const theme = useTheme();

//   // Detect if the current screen width is 'large' or smaller, to switch layout
//   /**
//    * Material UI provides the useMediaQuery hook to simplify the implementation of media queries, i.e.
//    * to query properties of the browser/device running the app. We are querying the browser’s viewport dimensions,
//    * checking if they are in the medium (md) or smaller category - a mobile device.
//    * The Theme object includes helper methods that generate the query string necessary to express the media query,
//    * When the browser/device is a mobile type, the site header should render the drop-down menu;
//    * otherwise, the standard navigation links should render.
//    */
//   const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

//   /**
//    * This returns true if the screen width is less than or equal to the 'lg' breakpoint
//    * width (usually 1280px). We use this boolean to render a hamburger menu on
//    * smaller screens and a full menu on larger screens.
//    * This approach adapts the UI responsively for better usability on phones/tablets
//    * vs desktops.
//    */
//   const [mobileAnchorEl, setMobileAnchorEl] = useState<null | HTMLElement>(
//     null
//   );
//   const mobileMenuOpen = Boolean(mobileAnchorEl);

//   // State to track the anchor element of the mobile hamburger menu (null if closed)
//   // https://mui.com/material-ui/react-menu/
//   const [movieMenuAnchorEl, setMovieMenuAnchorEl] =
//     useState<null | HTMLElement>(null);
//   // Boolean to check if mobile menu is open
//   const isMovieMenuOpen = Boolean(movieMenuAnchorEl);

//   /**
//    * Similar to anchorEl, but specifically for the submenu that drops down under
//    * the "Movie List" button on desktop. It stores the element that triggered
//    * the submenu to position it correctly.
//    * Handler to open the mobile hamburger menu by setting anchor element
//    */
//   const handleMobileMenu = (event: MouseEvent<HTMLElement>) => {
//     setMobileAnchorEl(event.currentTarget);
//   };

//   /**
//    * Called when the "Movie Lists" button is clicked (desktop view).
//    * Stores the clicked element button in movieMenuAnchorEl, which anchors the Movie Lists
//    * dropdown menu to that element. This allows Material UI to correctly position and
//    * open the submenu.
//    */
//   const handleMovieMenu = (event: MouseEvent<HTMLElement>) => {
//     setMovieMenuAnchorEl(event.currentTarget);
//   };

//   /**
//    * This function is called when the hamburger icon is clicked.
//    * event.currentTarget is the element clicked (IconButton),
//    * which is stored in anchorEl state to open the mobile Menu at that element’s position.
//    */
//   // Handler to close both mobile and submenu menus by clearing their anchor elements
//   const handleMenuClose = () => {
//     setMobileAnchorEl(null);
//     setMovieMenuAnchorEl(null);
//   };

//   /**
//    * Called when the "Movie List" button on desktop is clicked.
//    * Stores the button element in submenuAnchorEl to anchor the submenu to it.
//    */

//   // Navigate to the given path and close any open menus afterwards
//   // https://mui.com/material-ui/react-menu/#basic-menu
//   const handleNavigate = (path: string) => {
//     navigate(path);
//     handleMenuClose();
//   };

//   /**
//    * It programmatically changes the URL to the specified path using React Router's navigate.
//    * Then closes all menus to ensure clean UI state.
//    */
//   // List of menu options for mobile view (no dropdowns here)
//   const mobileMenuOptions = [
//     { label: t("home"), path: "/" },
//     { label: t("discover_movies"), path: "/movies/discover" },
//     { label: t("upcoming_movies"), path: "/movies/upcoming" },
//     { label: t("mustwatch_movies"), path: "/movies/mustwatchlist" },
//     { label: t("now_playing"), path: "/movies/nowplaying" },
//     { label: t("favorites_movies"), path: "/movies/favourites" },
//     { label: t("tv_series"), path: "/tvseries" },
//   ];

//   /**
//    * 'drawerOpen' state has been set for the logged in user state. The reason behind that is
//    * that to manage the open/close state of the UserProfileDrawer 'UserProfileDrawer/index.tsx',
//    * a side panel (also known as a drawer) that slides in from the edge of the screen, a boolean
//    * state variable that tracks whether the drawer is currently visible (true) or hidden (false)
//    * was needed
//    */
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   return (
//     <>
//       {/* Fixed header bar at the top */}
//       {/* <AppBar position="fixed" elevation={0} color="secondary"> */}
//       <AppBar
//         position="fixed"
//         elevation={0}
//         color="transparent"
//         // sx={{ bgcolor: "#B76E79" }}
//         sx={{ bgcolor: "#8E4585" }}
//       >
//         <Toolbar sx={{ color: "white" }}>
//           <Link onClick={() => navigate("/")} to={""} rel="noopener">
//             {/* // rel="noopener" */}
//             <VideoCameraFrontIcon
//               sx={{
//                 marginTop: 0.03,
//                 verticalAlign: "middle",
//                 mr: 0.5,
//                 fontSize: 60,
//                 color: "white",
//               }}
//             />
//           </Link>

//           {/* Main title, flexGrow pushes remaining content right */}
//           <Typography
//             variant="h4"
//             sx={{
//               flexGrow: 1,
//               color: "white",
//               marginRight: "2%",
//               fontSize: {
//                 xs: "1.8rem", // small screens
//                 sm: "2.3rem", // small to medium
//                 md: "2.3rem", // medium screens
//                 lg: "2.5rem", // large screens
//               },
//             }}
//           >
//             MoviesApp
//           </Typography>

//           {/* Conditional rendering based on screen size */}
//           {isMobile ? (
//             <>
//               <LanguageSwitcher />
//               {/* Mobile hamburger icon button */}
//               <IconButton
//                 aria-label="menu"
//                 onClick={handleMobileMenu}
//                 color="inherit"
//                 size="large"
//               >
//                 <MenuIcon />
//               </IconButton>

//               {/* Mobile menu dropdown anchored to hamburger button */}
//               <Menu
//                 id="mobile-menu"
//                 anchorEl={mobileAnchorEl}
//                 open={mobileMenuOpen}
//                 onClose={handleMenuClose}
//                 sx={{ color: "white" }}
//               >
//                 {/* Render flat list of mobile menu options */}
//                 {/* On mobile, menus are rendered as a flat list inside the hamburger menu for simplicity.
//                 No submenus are used here to keep the UI clean and usable on smaller screens.
//                 https://mui.com/material-ui/react-menu/
//                 */}
//                 {mobileMenuOptions.map((opt) => (
//                   <MenuItem
//                     key={opt.label}
//                     onClick={() => handleNavigate(opt.path)}
//                   >
//                     {opt.label}
//                   </MenuItem>
//                 ))}
//                 {token ? (
//                   <MenuItem onClick={() => setDrawerOpen(true)}>
//                     {t("welcome")} {userName}!{" "}
//                     <SkateboardingIcon sx={{ ml: 1 }} />
//                   </MenuItem>
//                 ) : (
//                   <MenuItem onClick={() => navigate("/login")}>
//                     {t("login")} <LoginIcon sx={{ ml: 1 }} />
//                   </MenuItem>
//                 )}
//               </Menu>
//             </>
//           ) : (
//             <>
//               <LanguageSwitcher />
//               {/* Desktop "Home" button */}
//               <Button color="inherit" onClick={() => handleNavigate("/")}>
//                 {t("home")}
//               </Button>

//               <Button
//                 color="inherit"
//                 // The onClick won't navigate to anywhere. Instead, it will
//                 // handle the subMenu onClick={handleMovieMenu}
//                 onClick={handleMovieMenu}
//                 aria-controls={isMovieMenuOpen ? "movie-menu" : undefined}
//                 aria-haspopup="true"
//                 aria-expanded={isMovieMenuOpen ? "true" : undefined}
//               >
//                 {t("movie_lists")}
//               </Button>
//               <Menu
//                 id="movie-menu"
//                 anchorEl={movieMenuAnchorEl}
//                 open={isMovieMenuOpen}
//                 onClose={handleMenuClose}
//                 anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
//                 transformOrigin={{ vertical: "top", horizontal: "left" }}
//               >
//                 {/* Dropdown options under "Movie List" */}
//                 <MenuItem onClick={() => handleNavigate("/movies/discover")}>
//                   {t("discover_movies")}
//                 </MenuItem>
//                 <MenuItem onClick={() => handleNavigate("/movies/upcoming")}>
//                   {t("upcoming_movies")}
//                 </MenuItem>
//                 <MenuItem
//                   onClick={() => handleNavigate("/movies/mustwatchlist")}
//                 >
//                   {t("mustwatch_movies")}
//                 </MenuItem>
//                 <MenuItem onClick={() => handleNavigate("/movies/nowplaying")}>
//                   {t("now_playing")}
//                 </MenuItem>
//               </Menu>

//               {/* Desktop "Favorites" button */}
//               <Button
//                 color="inherit"
//                 onClick={() => handleNavigate("/movies/favourites")}
//               >
//                 {t("favorites_movies")}
//               </Button>

//               <Button
//                 color="inherit"
//                 onClick={() => handleNavigate("/tvseries")}
//               >
//                 {t("tv_series")}
//               </Button>

//               {token ? (
//                 <>
//                   <Button
//                     color="inherit"
//                     // We are now handling the onClick with setDrawer
//                     onClick={() => setDrawerOpen(true)}
//                     endIcon={<SkateboardingIcon />}
//                   >
//                     {t("welcome")} {userName} !
//                   </Button>
//                 </>
//               ) : (
//                 <Button color="inherit" onClick={() => navigate("/login")}>
//                   {t("login")} <LoginIcon sx={{ ml: 1 }} />
//                 </Button>
//               )}
//             </>
//           )}
//         </Toolbar>
//         {/* This has been placed out side <Toolbar> to ensure it opens for all views */}
//         <UserProfileDrawer
//           open={drawerOpen}
//           onClose={() => setDrawerOpen(false)}
//         />
//       </AppBar>

//       {/* Push page content down so it is not hidden behind fixed AppBar */}
//       <Offset />
//     </>
//   );
// };

// export default SiteHeader;

/**
 * Material Ui allow us to define a style theme for the app which all components inherit -
 * it provides a default if none is declared. The useTheme hook gives components access to the theme.
 * Material UI provides the useMediaQuery hook to simplify the implementation of media queries, i.e.
 * to query properties of the browser/device running the app. We are querying the browser’s viewport
 * dimensions, checking if they are in the medium (md) or smaller category - a mobile device.
 * const isMobile = useMediaQuery(theme.breakpoints.down(“md”))
 * The Theme object includes helper methods that generate the query string necessary to express the media query,
 * e.g. theme.breakpoints.down().
 * When the browser/device is a mobile type, the site header should render the drop-down menu;
 * otherwise, the standard navigation links should render.
 */

import React, { useState, type MouseEvent, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";

import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { styled, useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import LoginIcon from "@mui/icons-material/Login";
// import VideoCameraFrontIcon from "@mui/icons-material/VideoCameraFront";
// import LanguageSwitcher from "../languageSwitcher";
// import UserProfileDrawer from "../UserProfileDrawer";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader: React.FC = () => {
  const [userName, setUserName] = useState("User");

  useEffect(() => {
    // You can remove this or set it from somewhere else if needed
    setUserName("User");
  }, []);

  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  //   const [drawerOpen, setDrawerOpen] = useState(false);

  const [mobileAnchorEl, setMobileAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const [movieMenuAnchorEl, setMovieMenuAnchorEl] =
    useState<null | HTMLElement>(null);

  const mobileMenuOpen = Boolean(mobileAnchorEl);
  const isMovieMenuOpen = Boolean(movieMenuAnchorEl);

  const handleMobileMenu = (event: MouseEvent<HTMLElement>) => {
    setMobileAnchorEl(event.currentTarget);
  };

  const handleMovieMenu = (event: MouseEvent<HTMLElement>) => {
    setMovieMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMobileAnchorEl(null);
    setMovieMenuAnchorEl(null);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    handleMenuClose();
  };

  const mobileMenuOptions = [
    { label: "Home", path: "/" },
    { label: "About us", path: "/movies/discover" },
    { label: "Rooms", path: "/movies/upcoming" },
    { label: "Facilities", path: "/movies/mustwatchlist" },
    { label: "Contact us", path: "/movies/nowplaying" },
  ];

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        color="transparent"
        sx={{ bgcolor: "#472d30;" }}
      >
        <Toolbar sx={{ color: "white" }}>
          <Link onClick={() => navigate("/")} to={""} rel="noopener"></Link>

          <Typography
            variant="h4"
            sx={{
              flexGrow: 1,
              color: "white",
              marginRight: "2%",
              fontSize: {
                xs: "1.2rem",
                sm: "1.5rem",
                md: "1.7rem",
                lg: "2.0rem",
              },
            }}
          >
            GuestEase
          </Typography>

          {isMobile ? (
            <>
              {/* <LanguageSwitcher /> */}
              <IconButton
                aria-label="menu"
                onClick={handleMobileMenu}
                color="inherit"
                size="large"
              >
                <MenuIcon />
              </IconButton>

              <Menu
                id="mobile-menu"
                anchorEl={mobileAnchorEl}
                open={mobileMenuOpen}
                onClose={handleMenuClose}
                sx={{ color: "white" }}
              >
                {mobileMenuOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleNavigate(opt.path)}
                  >
                    {opt.label}
                  </MenuItem>
                ))}

                {/* <MenuItem onClick={() => setDrawerOpen(true)}> */}
                <MenuItem>
                  Welcome {userName}!{" "}
                  {/*<SkateboardingIcon sx={{ ml: 1 }} /> */}
                </MenuItem>
                <MenuItem onClick={() => navigate("/login")}>
                  Login <LoginIcon sx={{ ml: 1 }} />
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              {/* <LanguageSwitcher /> */}
              <Button
                sx={{ textTransform: "none" }}
                color="inherit"
                onClick={() => handleNavigate("/")}
              >
                Home
              </Button>
              <Button
                sx={{ textTransform: "none" }}
                color="inherit"
                onClick={handleMovieMenu}
                aria-controls={isMovieMenuOpen ? "movie-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={isMovieMenuOpen ? "true" : undefined}
              >
                About us
              </Button>
              <Button
                sx={{ textTransform: "none" }}
                color="inherit"
                onClick={() => handleNavigate("/")}
              >
                Rooms
              </Button>
              <Button
                sx={{ textTransform: "none" }}
                color="inherit"
                onClick={handleMovieMenu}
                aria-controls={isMovieMenuOpen ? "movie-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={isMovieMenuOpen ? "true" : undefined}
              >
                Facilities
              </Button>

              <Button sx={{ textTransform: "none" }} color="inherit">
                Welcome {userName}!
              </Button>
              <Button
                sx={{ textTransform: "none" }}
                color="inherit"
                onClick={() => navigate("/login")}
              >
                Login <LoginIcon sx={{ ml: 1 }} />
              </Button>
            </>
          )}
        </Toolbar>

        {/* <UserProfileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} /> */}
      </AppBar>

      <Offset />
    </>
  );
};

export default SiteHeader;
