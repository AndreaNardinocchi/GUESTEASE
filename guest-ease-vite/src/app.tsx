import { Routes, Route } from "react-router-dom";
import SiteHeader from "./components/siteHeader/siteHeader";
import HomePage from "./pages/homepage";
import SearchResults from "./pages/searchResults";
import RoomDetail from "./pages/roomDetails";
import AuthContextProvider from "./context/authContext";
import LoginPage from "./pages/loginPage";

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
        </Routes>
      </AuthContextProvider>
    </>
  );
};

export default App;
