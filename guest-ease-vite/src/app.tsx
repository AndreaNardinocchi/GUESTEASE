import { Routes, Route } from "react-router-dom";
import SiteHeader from "./components/siteHeader/siteHeader";
import HomePage from "./pages/homepage";

const App = () => {
  return (
    <>
      <SiteHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/book" element={<BookingForm />} /> */}
        {/* You can add more pages here later */}
      </Routes>
    </>
  );
};

export default App;
