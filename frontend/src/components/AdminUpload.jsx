import { useState } from "react";

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
    "/src/assets/cert1.png",
    "/src/assets/cert2.png",
    "/src/assets/cert3.jpg"
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
      <h2 className="text-xl font-bold mb-4">Upload Certificate (Existing Asset)</h2>
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