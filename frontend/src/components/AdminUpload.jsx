import { useState } from "react";
import { Link } from "react-router-dom";

function AdminUpload() {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    course: "",
    details: "",
    imageUrl: "",
  });

  // List of existing certificate images
  const certificateImages = [
    "/src/assets/Ahmed-Abd-Al-Aziz_20250908_152858_0000.pdf",
    "/src/assets/Ahmed_CEAIA1-1.pdf",
    "/src/assets/AnjanaKumudu-Gayantha-Vijayaveera-_20250908_152931_0000.pdf",
    "/src/assets/Ayyappan-Paramesh_20250908_152955_0000.pdf",
    "/src/assets/Ben-Teunissen.pdf",
    "/src/assets/Kishore-N-V-S-S-Tummalapalli.pdf",
    "/src/assets/Mandyam-Niranjan_20250908_153016_0000.pdf",
    "/src/assets/Mubin-Shaik.pdf",
    "/src/assets/Mubin-Shaik_20251023_133455_0000.pdf",
    "/src/assets/Rizvi-Athram.pdf",
    "/src/assets/Sahaya-Thivearaj.pdf",
    "/src/assets/Satyanarayana-Komaravolu_20250908_153041_0000.pdf",
    "/src/assets/Sudhakar-Krovi_20250908_153104_0000.pdf",
    "/src/assets/Tharanath-Umesh.pdf",
    "/src/assets/Vijayababu-Boopathy.pdf",
    "/src/assets/Yogesh-V-Shetty-_20250908_153130_0000.pdf",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:5000/upload", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const result = await res.json();
    alert(result.message || "Uploaded!");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Upload Certificate (Existing Asset)</h2>
        <Link 
          to="/admin/manage"
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
        >
          Manage Certificates
        </Link>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input 
          type="email"
          name="email" 
          placeholder="User Email" 
          value={formData.email}
          onChange={handleChange} 
          className="p-2 border rounded"
          required 
        />
        <input 
          type="text"
          name="name" 
          placeholder="Name" 
          value={formData.name}
          onChange={handleChange} 
          className="p-2 border rounded"
          required 
        />
        <input 
          type="text"
          name="course" 
          placeholder="Course" 
          value={formData.course}
          onChange={handleChange} 
          className="p-2 border rounded"
          required 
        />
        <textarea 
          name="details" 
          placeholder="Details" 
          value={formData.details}
          onChange={handleChange} 
          className="p-2 border rounded"
          required 
        />
        
        <label className="font-medium">Select Certificate Image:</label>
        <select 
          name="imageUrl" 
          onChange={handleChange} 
          value={formData.imageUrl}
          className="p-2 border rounded"
          required
        >
          <option value="">-- Select Image --</option>
          {certificateImages.map((img, idx) => (
            <option key={idx} value={img}>{img}</option>
          ))}
        </select>

        <button 
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors" 
          type="submit"
        >
          Save to Database
        </button>
      </form>
    </div>
  );
}

export default AdminUpload;