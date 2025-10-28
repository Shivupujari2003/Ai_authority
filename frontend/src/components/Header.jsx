import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/ai-logo.jpg";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* ✅ Left: Logo + Title */}
          <div className="flex items-center space-x-2">
            <img
              src={logo}
              alt="AI Authority Logo"
              className="w-14 h-14 rounded-full object-cover"
            />
            <span className="text-blue-700 text-2xl font-bold">AI Authority</span>
          </div>

          {/* ✅ Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-blue-700 hover:text-blue-500 font-medium">
              Home
            </Link>

            <Link to="/about" className="text-blue-700 hover:text-blue-500 font-medium">
              About
            </Link>

            {/* 🔹 Knowledge Hub Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("knowledge")}
                className="flex items-center text-blue-700 hover:text-blue-500 font-medium"
              >
                Knowledge Hub
                <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              {openDropdown === "knowledge" && (
                <div className="absolute bg-white shadow-lg mt-2 py-2 rounded-md w-56">
                  <Link to="/frameworks" className="block px-4 py-2 text-blue-700 hover:bg-blue-50">
                    Frameworks
                  </Link>
                  <Link to="/toolkits" className="block px-4 py-2 text-blue-700 hover:bg-blue-50">
                    Toolkits
                  </Link>
                  <Link to="/standards" className="block px-4 py-2 text-blue-700 hover:bg-blue-50">
                    Standards & Regulations
                  </Link>
                  <Link to="/blogs" className="block px-4 py-2 text-blue-700 hover:bg-blue-50">
                    Blogs
                  </Link>
                </div>
              )}
            </div>

            {/* 🔹 Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("services")}
                className="flex items-center text-blue-700 hover:text-blue-500 font-medium"
              >
                Services
                <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              {openDropdown === "services" && (
                <div className="absolute bg-white shadow-lg mt-2 py-2 rounded-md w-56">
                  <Link to="/training" className="block px-4 py-2 text-blue-700 hover:bg-blue-50">
                    Training Service
                  </Link>
                  <Link to="/consulting" className="block px-4 py-2 text-blue-700 hover:bg-blue-50">
                    Consulting Service
                  </Link>
                </div>
              )}
            </div>

            {/* 🔹 Certification Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("certification")}
                className="flex items-center text-blue-700 hover:text-blue-500 font-medium"
              >
                Certification
                <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              {openDropdown === "certification" && (
                <div className="absolute bg-white shadow-lg mt-2 py-2 rounded-md w-64">
                  <Link to="/certified-members" className="block px-4 py-2 text-blue-700 hover:bg-blue-50">
                    Certified Members
                  </Link>
                  <Link to="/accredited-trainers" className="block px-4 py-2 text-blue-700 hover:bg-blue-50">
                    Accredited Trainers
                  </Link>
                </div>
              )}
            </div>

            <Link to="/membership" className="text-blue-700 hover:text-blue-500 font-medium">
              Membership
            </Link>

            <Link to="/contact" className="text-blue-700 hover:text-blue-500 font-medium">
              Contact
            </Link>
          </div>

          {/* ✅ Mobile Menu Button */}
          <button
            className="md:hidden text-blue-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* ✅ Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg mt-2 rounded-lg p-4 space-y-4">
            {/* Top-Level Links */}
            <Link to="/" className="block text-blue-700 font-medium hover:text-blue-500">
              Home
            </Link>
            <Link to="/about" className="block text-blue-700 font-medium hover:text-blue-500">
              About
            </Link>

            {/* Knowledge Hub Dropdown */}
            <div>
              <p className="text-blue-700 font-semibold">Knowledge Hub</p>
              <div className="ml-4 space-y-1">
                <Link to="/frameworks" className="block text-blue-600 hover:text-blue-500">
                  Frameworks
                </Link>
                <Link to="/toolkits" className="block text-blue-600 hover:text-blue-500">
                  Toolkits
                </Link>
                <Link to="/standards" className="block text-blue-600 hover:text-blue-500">
                  Standards & Regulations
                </Link>
                <Link to="/blogs" className="block text-blue-600 hover:text-blue-500">
                  Blogs
                </Link>
              </div>
            </div>

            {/* Services Dropdown */}
            <div>
              <p className="text-blue-700 font-semibold">Services</p>
              <div className="ml-4 space-y-1">
                <Link to="/training" className="block text-blue-600 hover:text-blue-500">
                  Training Service
                </Link>
                <Link to="/consulting" className="block text-blue-600 hover:text-blue-500">
                  Consulting Service
                </Link>
              </div>
            </div>

            {/* Certification Dropdown */}
            <div>
              <p className="text-blue-700 font-semibold">Certification</p>
              <div className="ml-4 space-y-1">
                <Link to="/certified-members" className="block text-blue-600 hover:text-blue-500">
                  Certified Members
                </Link>
                <Link to="/accredited-trainers" className="block text-blue-600 hover:text-blue-500">
                  Accredited Trainers
                </Link>
              </div>
            </div>

            <Link to="/membership" className="block text-blue-700 font-medium hover:text-blue-500">
              Membership
            </Link>
            <Link to="/contact" className="block text-blue-700 font-medium hover:text-blue-500">
              Contact
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
