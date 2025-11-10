import React from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/Untitled-design-27.png";
import snaLogo from "../assets/SNA-Logo-1.jpg";
import coeussLogo from "../assets/coeuss.jpg";
import tekshapersLogo from "../assets/logo-new.png";
import infiniteLogo from "../assets/final-logo-3.png";

export default function Membership() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* Hero Section */}
      <div
        className="relative h-[80vh] bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundAttachment: "scroll",
        }}
      >
        <div className="absolute inset-0 bg-white/40" />
        <h1 className="relative text-5xl font-bold text-gray-900 z-10 text-center px-4">
          Membership
        </h1>
      </div>

      {/* Individual Membership Section */}
      <section className="max-w-5xl mx-auto py-16 px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Individual Membership</h2>
        <p className="text-gray-600 mb-10 leading-relaxed">
          Access to exclusive learning paths, certification opportunities, expert
          community, and ongoing regulatory updates.
        </p>

        <h3 className="text-2xl font-semibold mb-4 text-left">Benefits</h3>
        <ul className="text-gray-700 text-left list-disc pl-6 space-y-2">
          <li>Access to knowledge repository and artifacts.</li>
          <li>Sharing of real-time experiences.</li>
          <li>Trusted partner for upskilling in AI Journey.</li>
          <li>Technical support and guidance.</li>
          <li>Attend conferences and bootcamps at discounted rates.</li>
          <li>Custom training programs.</li>
          <li>Consulting services for AI implementation.</li>
          <li>Mentoring services for career growth.</li>
        </ul>

        <div className="mt-10">
          <a
            href="/contact"
            className="bg-red-500 text-white font-semibold px-8 py-3 rounded-full hover:bg-red-600 transition-all"
          >
            Contact Us
          </a>
        </div>
      </section>

      {/* Corporate Membership Section */}
      <section className="bg-[#f7f8fa] py-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Corporate Membership</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
            {/* Platinum */}
            <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
              <h3 className="text-2xl font-semibold text-center mb-4">Platinum</h3>
              <ul className="list-disc text-gray-700 space-y-2 pl-6">
                <li>Board Membership (One seat for one organization).</li>
                <li>Influence activities within AI Authority.</li>
                <li>Discount on consulting and training services (up to 50%).</li>
              </ul>
              <h4 className="text-lg font-semibold text-center mt-6 mb-2">
                Current Members
              </h4>
              <div className="flex flex-col items-center gap-4">
                <img src={snaLogo} alt="SNA Technologies" className="w-44" />
                <img src={coeussLogo} alt="Coeuss" className="w-40" />
              </div>
            </div>

            {/* Gold */}
            <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
              <h3 className="text-2xl font-semibold text-center mb-4">Gold</h3>
              <ul className="list-disc text-gray-700 space-y-2 pl-6">
                <li>Advisory role for AI Authority.</li>
                <li>Discount on consulting and training services (up to 30%).</li>
              </ul>
              <h4 className="text-lg font-semibold text-center mt-6 mb-2">
                Current Members
              </h4>
              <div className="flex flex-col items-center gap-4">
                <img src={tekshapersLogo} alt="Tekshapers" className="w-44" />
                <img src={infiniteLogo} alt="Infinite IT" className="w-44" />
              </div>
            </div>

            {/* Silver */}
            <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
              <h3 className="text-2xl font-semibold text-center mb-4">Silver</h3>
              <ul className="list-disc text-gray-700 space-y-2 pl-6">
                <li>Discount on consulting and training services (up to 15%).</li>
                <li>Access to training materials and community forums.</li>
              </ul>
            </div>

            {/* Academia */}
            <div className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all">
              <h3 className="text-2xl font-semibold text-center mb-4">Academia</h3>
              <ul className="list-disc text-gray-700 space-y-2 pl-6">
                <li>Access to training materials and community forums.</li>
                <li>Discount on training services (up to 50%).</li>
              </ul>
            </div>
          </div>

          <div className="mt-12">
            <a
              href="/contact"
              className="bg-red-500 text-white font-semibold px-8 py-3 rounded-full hover:bg-red-600 transition-all"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>

      {/* Unified Login / Signup Section */}
      <section className="bg-white py-20 text-center border-t">
        <div className="max-w-3xl mx-auto px-6">
          <p className="text-lg text-gray-700 mb-6 font-medium">
            Join our growing AI community and unlock access to exclusive resources,
            mentorship, and opportunities.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white font-semibold px-10 py-4 rounded-xl hover:bg-blue-700 transition-all"
          >
            Sign Up / Login
          </button>
        </div>
      </section>
    </div>
  );
}
