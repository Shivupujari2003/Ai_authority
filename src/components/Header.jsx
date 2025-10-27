import { useState } from "react";
import { Menu, X, ChevronDown, Brain } from "lucide-react";
import logo from "../assets/ai-logo.jpg";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  return (
    <header className="fixed w-full top-0 z-50 bg-white shadow-md">
      <nav className="max-w-7xl mx-auto px-0 lg:px-0">
        <div className="flex justify-between items-center h-20">

          {/* Left: Logo */}
          <div className="flex items-center space-x-1">
            <img
              src={logo}
              alt="AI Authority Logo"
              className="w-20 h-20 rounded-full object-cover"
            />
            <span className="text-blue-700 text-2xl font-bold">
              AI Authority
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#home"
              className="text-blue-700 hover:text-blue-500 transition-colors font-medium"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-blue-700 hover:text-blue-500 transition-colors font-medium"
            >
              About
            </a>

            {/* Knowledge Hub Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("knowledge")}
                className="flex items-center text-blue-700 hover:text-blue-500 font-medium"
              >
                Knowledge Hub
                <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              {openDropdown === "knowledge" && (
                <div className="absolute bg-white shadow-lg mt-2 py-2 rounded-md w-48">
                  <a
                    href="#articles"
                    className="block px-4 py-2 text-blue-700 hover:bg-blue-50"
                  >
                    Articles
                  </a>
                  <a
                    href="#videos"
                    className="block px-4 py-2 text-blue-700 hover:bg-blue-50"
                  >
                    Videos
                  </a>
                  <a
                    href="#resources"
                    className="block px-4 py-2 text-blue-700 hover:bg-blue-50"
                  >
                    Resources
                  </a>
                </div>
              )}
            </div>

            {/* Services Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("services")}
                className="flex items-center text-blue-700 hover:text-blue-500 font-medium"
              >
                Services
                <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              {openDropdown === "services" && (
                <div className="absolute bg-white shadow-lg mt-2 py-2 rounded-md w-48">
                  <a
                    href="#consulting"
                    className="block px-4 py-2 text-blue-700 hover:bg-blue-50"
                  >
                    Consulting
                  </a>
                  <a
                    href="#training"
                    className="block px-4 py-2 text-blue-700 hover:bg-blue-50"
                  >
                    Training
                  </a>
                  <a
                    href="#support"
                    className="block px-4 py-2 text-blue-700 hover:bg-blue-50"
                  >
                    Support
                  </a>
                </div>
              )}
            </div>

            {/* Certification Dropdown */}
            <div className="relative">
              <button
                onClick={() => toggleDropdown("certification")}
                className="flex items-center text-blue-700 hover:text-blue-500 font-medium"
              >
                Certification
                <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              {openDropdown === "certification" && (
                <div className="absolute bg-white shadow-lg mt-2 py-2 rounded-md w-56">
                  <a
                    href="#ai-cert"
                    className="block px-4 py-2 text-blue-700 hover:bg-blue-50"
                  >
                    AI Certification
                  </a>
                  <a
                    href="#ml-cert"
                    className="block px-4 py-2 text-blue-700 hover:bg-blue-50"
                  >
                    ML Certification
                  </a>
                  <a
                    href="#data-cert"
                    className="block px-4 py-2 text-blue-700 hover:bg-blue-50"
                  >
                    Data Analytics
                  </a>
                </div>
              )}
            </div>

            <a
              href="#membership"
              className="text-blue-700 hover:text-blue-500 transition-colors font-medium"
            >
              Membership
            </a>
            <a
              href="#contact"
              className="text-blue-700 hover:text-blue-500 transition-colors font-medium"
            >
              Contact
            </a>
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
          <div className="md:hidden pb-6 space-y-3 bg-white mt-2 shadow-lg rounded-lg p-4">
            {["Home", "About", "Membership", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block text-blue-700 hover:text-blue-500 font-medium"
              >
                {item}
              </a>
            ))}

            {/* Mobile dropdowns */}
            <div>
              <p className="text-blue-700 font-medium mt-2">Knowledge Hub</p>
              <div className="ml-3 space-y-1">
                <a href="#articles" className="block text-blue-600">
                  Articles
                </a>
                <a href="#videos" className="block text-blue-600">
                  Videos
                </a>
                <a href="#resources" className="block text-blue-600">
                  Resources
                </a>
              </div>

              <p className="text-blue-700 font-medium mt-2">Services</p>
              <div className="ml-3 space-y-1">
                <a href="#consulting" className="block text-blue-600">
                  Consulting
                </a>
                <a href="#training" className="block text-blue-600">
                  Training
                </a>
                <a href="#support" className="block text-blue-600">
                  Support
                </a>
              </div>

              <p className="text-blue-700 font-medium mt-2">Certification</p>
              <div className="ml-3 space-y-1">
                <a href="#ai-cert" className="block text-blue-600">
                  AI Certification
                </a>
                <a href="#ml-cert" className="block text-blue-600">
                  ML Certification
                </a>
                <a href="#data-cert" className="block text-blue-600">
                  Data Analytics
                </a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
