import { Routes, Route } from "react-router-dom";
import SiteHeader from "./components/siteHeader/siteHeader";
import HomePage from "./pages/homepage";
import SearchResults from "./pages/searchResults";
import RoomDetail from "./pages/roomDetails";
import AuthContextProvider from "./context/authContext";
import LoginPage from "./pages/loginPage";
import SignUpPage from "./pages/signUpPage";
import AccountPage from "./pages/accountPage";
import ProfilePage from "./pages/profilePage";
import FavoritesPage from "./pages/favoritesPage";
import ProtectedRoute from "./routes/protectedRoutes";
// import ProtectedRoute from "./routes/protectedRoutes";

const App = () => {
  return (
    <>
      <AuthContextProvider>
        <SiteHeader />
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* <Route path="/book" element={<BookingForm />} /> */}
          {/* You can add more pages here later */}
          <Route path="/search-results" element={<SearchResults />} />

          <Route path="/room/:roomId" element={<RoomDetail />} />

          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <AccountPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/account/favorites"
            element={
              <ProtectedRoute>
                <FavoritesPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthContextProvider>
    </>
  );
};

export default App;
