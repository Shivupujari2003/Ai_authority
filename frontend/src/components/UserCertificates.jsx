import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

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
        // Prepend backend URL to imageUrl if it's a relative path
        const certsWithFullUrl = certs.map(cert => ({
          ...cert,
          imageUrl: cert.imageUrl?.startsWith('http') 
            ? cert.imageUrl 
            : `http://localhost:5000${cert.imageUrl}`
        }));
        setCertificates(certsWithFullUrl);
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
          <div key={i} className="border rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition">
            {/* Certificate Preview */}
            <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden">
              {cert.imageUrl?.endsWith('.pdf') ? (
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
                        <p className="text-sm text-gray-600 font-semibold">PDF Certificate</p>
                        <a 
                          href={cert.imageUrl} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 text-xs hover:underline mt-2 inline-block"
                        >
                          Click to view
                        </a>
                      </div>
                    </div>
                  }
                >
                  <Page 
                    pageNumber={1} 
                    width={300}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </Document>
              ) : (
                <img 
                  src={cert.imageUrl} 
                  alt={cert.name} 
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            
            {/* Certificate Details */}
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{cert.name}</h3>
              <p className="text-gray-700 mb-1"><span className="font-medium">Course:</span> {cert.course}</p>
              <p className="text-gray-600 text-sm mb-3">{cert.details}</p>
              
              {/* View/Download Button */}
              <a 
                href={cert.imageUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition text-sm"
              >
                {cert.imageUrl?.endsWith('.pdf') ? 'View Full PDF' : 'View Certificate'}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserCertificates;