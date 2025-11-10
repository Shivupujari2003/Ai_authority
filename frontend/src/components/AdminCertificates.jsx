import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Search } from "lucide-react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function AdminCertificates() {
  const [email, setEmail] = useState("");
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  // ✅ Base API URL (works locally and on Vercel)
  const API_BASE = import.meta.env.VITE_API_URL;

  const fetchUserCertificates = async () => {
    if (!email) {
      setError("Please enter an email address");
      return;
    }

    setLoading(true);
    setError(null);
    setMessage("");

    try {
      const res = await fetch(`${API_BASE}/certificates?email=${email}`);
      if (!res.ok) {
        throw new Error("User not found or no certificates");
      }
      const certs = await res.json();
      setCertificates(certs);
    } catch (err) {
      setError(err.message);
      setCertificates([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteCertificate = async (certificateId) => {
    if (!window.confirm("Are you sure you want to delete this certificate?")) {
      return;
    }

    try {
      const encodedEmail = encodeURIComponent(email);
      const url = `${API_BASE}/certificates/${encodedEmail}/${certificateId}`;

      console.log("Deleting certificate:", { email, certificateId, url });

      const res = await fetch(url, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || result.message || "Failed to delete certificate");
      }

      setMessage("Certificate deleted successfully!");
      setCertificates(certificates.filter((cert) => cert._id !== certificateId));
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      console.error("Delete error:", err);
      setError(err.message);
      setTimeout(() => setError(null), 3000);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Manage User Certificates</h2>
        <Link
          to="/admin/certificates"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Upload New Certificate
        </Link>
      </div>

      {/* Search Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <div className="flex gap-3">
          <input
            type="email"
            placeholder="Enter user email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => e.key === "Enter" && fetchUserCertificates()}
          />
          <button
            onClick={fetchUserCertificates}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            disabled={loading}
          >
            <Search className="w-5 h-5" />
            {loading ? "Searching..." : "Search"}
          </button>
        </div>
      </div>

      {/* Messages */}
      {message && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {message}
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Certificates List */}
      {certificates.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">
            Certificates for {email} ({certificates.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert) => (
              <div key={cert._id} className="bg-white border rounded-lg shadow-lg overflow-hidden relative">
                {/* Delete Button */}
                <button
                  onClick={() => deleteCertificate(cert._id)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition z-10"
                  title="Delete certificate"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                {/* Certificate Preview */}
                <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
                  {cert.imageUrl?.endsWith(".pdf") ? (
                    <Document
                      file={cert.imageUrl}
                      loading={
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center">
                            <div className="text-4xl mb-2">📄</div>
                            <p className="text-sm text-gray-500">Loading PDF...</p>
                          </div>
                        </div>
                      }
                      error={
                        <div className="flex items-center justify-center h-full">
                          <div className="text-center p-4">
                            <div className="text-6xl mb-2">📄</div>
                            <p className="text-sm text-gray-600">PDF Certificate</p>
                          </div>
                        </div>
                      }
                    >
                      <Page pageNumber={1} width={300} renderTextLayer={false} renderAnnotationLayer={false} />
                    </Document>
                  ) : (
                    <img src={cert.imageUrl} alt={cert.name} className="w-full h-full object-cover" />
                  )}
                </div>

                {/* Certificate Details */}
                <div className="p-4">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">{cert.name}</h4>
                  <p className="text-gray-600 mb-1">
                    <span className="font-medium">Course:</span> {cert.course}
                  </p>
                  <p className="text-gray-600 mb-1 text-sm">{cert.details}</p>
                  <p className="text-gray-400 text-xs mt-2">
                    Issued: {new Date(cert.issuedDate).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!loading && certificates.length === 0 && email && !error && (
        <div className="text-center text-gray-500 py-12">
          <p className="text-lg">No certificates found for this user.</p>
        </div>
      )}
    </div>
  );
}

export default AdminCertificates;
