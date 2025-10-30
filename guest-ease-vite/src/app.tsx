import { Routes, Route } from "react-router-dom";
import SiteHeader from "./components/siteHeader/siteHeader";
import HomePage from "./pages/homepage";
import SearchResults from "./pages/searchResults";

const App = () => {
  return (
    <>
      <SiteHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/book" element={<BookingForm />} /> */}
        {/* You can add more pages here later */}
        <Route path="/search-results" element={<SearchResults />} />
      </Routes>
    </>
  );
};

export default App;
