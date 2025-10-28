import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Membership from "./components/Membership";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Services from "./pages/Services";
// import Contact from "./pages/Contact";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header stays on top */}
      <Header />

      {/* Main content grows to fill available space */}
      <main className="flex-grow">
        <Routes>
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/about" element={<About />} /> */}
          {/* <Route path="/services" element={<Services />} /> */}
          {/* <Route path="/contact" element={<Contact />} /> */}
          <Route path="/membership" element={<Membership />} />
        </Routes>
      </main>

      {/* Footer sticks at the bottom */}
      <Footer />
    </div>
  );
}
