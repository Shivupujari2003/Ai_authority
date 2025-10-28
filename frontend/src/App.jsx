import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Membership from "./components/Membership";
import AdminUpload from "./components/AdminUpload";
import UserCertificates from "./components/UserCertificates";
import { PrivateRoute, AdminRoute } from "./components/PrivateRoute";
import Login from "./components/Login";
import Home from "./components/Home";
// import About from "./pages/About";
// import Services from "./pages/Services";
// import Contact from "./pages/Contact";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header stays on top */}
      <Header />

      {/* Main content grows to fill available space */}
      <main className="flex-grow pt-20">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/membership" element={<Membership />} />
          <Route 
            path="/certificates" 
            element={
              <PrivateRoute>
                <UserCertificates />
              </PrivateRoute>
            } 
          />
          <Route 
            path="/admin/certificates" 
            element={
              <AdminRoute>
                <AdminUpload />
              </AdminRoute>
            } 
          />
          <Route path="/" element={<Home />} />
        </Routes>
      </main>

      {/* Footer sticks at the bottom */}
      <Footer />
    </div>
  );
}
