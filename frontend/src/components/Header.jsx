import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/ai-logo.jpg";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full z-50 bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo + Title */}
          <div className="flex items-center space-x-2">
            <img
              src={logo}
              alt="AI Authority Logo"
              className="w-14 h-14 rounded-full object-cover"
            />
            <span className="text-blue-700 text-2xl font-bold">AI Authority</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-blue-700 hover:text-blue-500 font-medium">
              Home
            </Link>

            <Link to="/about" className="text-blue-700 hover:text-blue-500 font-medium">
              About
            </Link>

            {/* Knowledge Hub */}
            <div className="relative group">
              <button className="flex items-center text-blue-700 hover:text-blue-500 font-medium">
                Knowledge Hub
                <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              <div className="absolute left-0 top-full w-56 bg-white shadow-lg rounded-md py-2
                              opacity-0 invisible group-hover:opacity-100 group-hover:visible
                              transition-[opacity,transform,visibility] duration-150 translate-y-1 group-hover:translate-y-0 z-50">
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
            </div>

            {/* ✅ Services (main link + dropdown) */}
            <div className="relative group">
              <Link
                to="/services"
                className="flex items-center text-blue-700 hover:text-blue-500 font-medium"
              >
                Services
                <ChevronDown className="ml-1 w-4 h-4" />
              </Link>

              <div
                className="absolute left-0 top-full w-56 bg-white shadow-lg rounded-md py-2
                           opacity-0 invisible group-hover:opacity-100 group-hover:visible
                           transition-[opacity,transform,visibility] duration-150 translate-y-1 group-hover:translate-y-0 z-50"
              >
                <Link
                  to="/services/training"
                  className="block px-4 py-2 text-blue-700 hover:bg-blue-50"
                >
                  Training Service
                </Link>
                <Link
                  to="/services/consulting"
                  className="block px-4 py-2 text-blue-700 hover:bg-blue-50"
                >
                  Consulting Service
                </Link>
              </div>
            </div>

            {/* Certification */}
            <div className="relative group">
              <Link
                to="/certifications"
                className="flex items-center text-blue-700 hover:text-blue-500 font-medium"
              >
                Certification
                <ChevronDown className="ml-1 w-4 h-4" />
              </Link>
              <div
                className="absolute left-0 top-full w-64 bg-white shadow-lg rounded-md py-2
                            opacity-0 invisible group-hover:opacity-100 group-hover:visible
                            transition-[opacity,transform,visibility] duration-150 translate-y-1 group-hover:translate-y-0 z-50"
              >
                <Link
                  to="/certified-members"
                  className="block px-4 py-2 text-blue-700 hover:bg-blue-50"
                >
                  Certified Members
                </Link>
                <Link
                  to="/accredited-trainers"
                  className="block px-4 py-2 text-blue-700 hover:bg-blue-50"
                >
                  Accredited Trainers
                </Link>
              </div>
            </div>

            <Link to="/membership" className="text-blue-700 hover:text-blue-500 font-medium">
              Membership
            </Link>

            <Link to="/contact" className="text-blue-700 hover:text-blue-500 font-medium">
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-blue-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white shadow-lg mt-2 rounded-lg p-4 space-y-4">
            <Link to="/" className="block text-blue-700 font-medium hover:text-blue-500">
              Home
            </Link>
            <Link to="/about" className="block text-blue-700 font-medium hover:text-blue-500">
              About
            </Link>

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

            <div>
              <Link
                to="/services"
                className="text-blue-700 font-semibold hover:text-blue-500"
              >
                Services
              </Link>
              <div className="ml-4 space-y-1">
                <Link
                  to="/services/training"
                  className="block text-blue-600 hover:text-blue-500"
                >
                  Training Service
                </Link>
                <Link
                  to="/services/consulting"
                  className="block text-blue-600 hover:text-blue-500"
                >
                  Consulting Service
                </Link>
              </div>
            </div>

            <div>
              <Link
                to="/certifications"
                className="text-blue-700 font-semibold hover:text-blue-500"
              >
                Certification
              </Link>
              <div className="ml-4 space-y-1">
                <Link
                  to="/certified-members"
                  className="block text-blue-600 hover:text-blue-500"
                >
                  Certified Members
                </Link>
                <Link
                  to="/accredited-trainers"
                  className="block text-blue-600 hover:text-blue-500"
                >
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
