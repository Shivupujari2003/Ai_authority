import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Membership from "./components/Membership";
import AdminUpload from "./components/AdminUpload";
import AdminCertificates from "./components/AdminCertificates";
import UserCertificates from "./components/UserCertificates";
import { PrivateRoute, AdminRoute } from "./components/PrivateRoute";
import Login from "./components/Login";
import Home from "./components/Home";
import Contact from "./components/Contact";
import About from "./components/About";
import PaymentPage from "./components/Payment";
import Success from "./components/Success";
import Cancel from "./components/Cancel";
import Frameworks from "./components/Frameworks";
import AiStrategyCourse from "./components/AiStrategyCourse";
import EnterpriseAiArchitectureCourse from "./components/EnterpriseAiArchitectureCourse";
import Toolkits from "./components/Toolkits";
import Standards from "./components/Standards";
import Blogs from "./components/Blogs";
import BlogPost from "./components/BlogPost";
import ConsultingService from "./components/ConsultingService";
// import Services from "./pages/Services";
import TrainingService from "./components/TrainingService";
import AccreditedTrainers from "./components/AccreditedTrainers";
import Certifications from "./components/Certifications";
import CertifiedMembers from "./components/CertifiedMembers";
import ScrollToTop from "./components/Scroll";
import Services from "./components/Services";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header stays on top */}
      <Header />

      {/* Main content grows to fill available space */}
      <main className="flex-grow">
        {/* Scroll to top on each route change */}
        <ScrollToTop />

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
          <Route
            path="/admin/manage"
            element={
              <AdminRoute>
                <AdminCertificates />
              </AdminRoute>
            }
          />
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/frameworks" element={<Frameworks />} />
          <Route path="/toolkits" element={<Toolkits />} />
          <Route path="/standards" element={<Standards />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/artificial-intelligence-design" element={<BlogPost />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/services/training" element={<TrainingService />} />
          <Route path="/services/consulting" element={<ConsultingService />} />
          <Route path="/accredited-trainers" element={<AccreditedTrainers />} />
          <Route path="/certifications" element={<Certifications />} />
          <Route path="/certified-members" element={<CertifiedMembers />} />
          <Route path="/services" element={<Services />} />
          <Route path="/ai-strategy-course" element={<AiStrategyCourse />} />
          <Route path="/enterprise-ai-architecture-course" element={<EnterpriseAiArchitectureCourse />} />
        </Routes>
      </main>

      {/* Footer sticks at the bottom */}
      <Footer />
    </div>
  );
}
