import { useState, useEffect } from "react";

function UserCertificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) {
          throw new Error('User email not found. Please login again.');
        }
        
        const res = await fetch(`http://localhost:5000/certificates?email=${userEmail}`);
        if (!res.ok) {
          throw new Error('Failed to fetch certificates');
        }
        const certs = await res.json();
        setCertificates(certs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, []);

  if (loading) return <div className="p-6">Loading certificates...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;
  if (!certificates.length) return <div className="p-6">No certificates found.</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Certificates</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certificates.map((cert, i) => (
          <div key={i} className="border rounded-lg shadow-lg overflow-hidden">
            <img 
              src={cert.imageUrl} 
              alt={cert.name} 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{cert.name}</h3>
              <p className="text-gray-700 mb-1">Course: {cert.course}</p>
              <p className="text-gray-600 text-sm">{cert.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserCertificates;