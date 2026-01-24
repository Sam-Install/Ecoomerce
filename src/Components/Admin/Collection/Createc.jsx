import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Createc = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    sizes: [],
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const categories = ["men", "women", "children", "electronics"];
  const sizesOptions = ["S", "M", "L", "XL"];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    if (files) {
      setFormData((prev) => ({ ...prev, image: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else if (type === "checkbox") {
      if (checked) {
        setFormData((prev) => ({ ...prev, sizes: [...prev.sizes, value] }));
      } else {
        setFormData((prev) => ({
          ...prev,
          sizes: prev.sizes.filter((s) => s !== value),
        }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("description", formData.description);
      formData.sizes.forEach((s) => data.append("sizes[]", s));
      if (formData.image) data.append("image", formData.image);

      const res = await fetch("http://127.0.0.1:8000/api/collections", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message || "Failed to create collection");

      navigate("/admin/collection/showc"); 
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 shadow rounded my-10">
      <h1 className="text-2xl font-bold mb-6">Create Collection Product</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border p-2 rounded"
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          placeholder="Description"
          className="w-full border p-2 rounded"
        />

        
        <div className="flex gap-3 flex-wrap">
          {sizesOptions.map((size) => (
            <label key={size} className="flex items-center gap-1">
              <input
                type="checkbox"
                name="sizes"
                value={size}
                checked={formData.sizes.includes(size)}
                onChange={handleChange}
              />
              {size}
            </label>
          ))}
        </div>

        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
        />

        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-2 h-32 object-cover rounded"
          />
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-orange-300 text-white px-6 py-2 rounded hover:bg-orange-600"
        >
          {loading ? "Creating..." : "Create Collection Product"}
        </button>
      </form>
    </div>
  );
};

export default Createc;
