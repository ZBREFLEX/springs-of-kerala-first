import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Vehicle from "./components/Vehicle";
import Destinations from "./components/Destinations";
import Gallery from "./components/Gallery";
import Packages from "./components/Packages";
import About from "./components/About";
import Review from "./components/Review";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import AdminLogin from "./admin/AdminLogin";
import ProtectedRoute from "./admin/ProtectedRoute";
import GalleryPage from "./components/GalleryPage";
import AdminLayout from "./admin/AdminLayout";

const PublicSite = () => (
  <>
    <Navbar />
    <Hero />
    <Vehicle />
    <Destinations />
    <Gallery />
    <Packages />
    <About />
    <Review />
    <Contact />
    <Footer />
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicSite />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/admin" element={<AdminLogin />} />
        
        <Route path="/admin/dashboard" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
          
          } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
