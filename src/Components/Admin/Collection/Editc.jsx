import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Editc = () => {
  const { id } = useParams(); // collection ID from URL
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    description: "",
    sizes: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = ["men", "women", "children", "electronics"];

  // Fetch specific collection
  useEffect(() => {
    const fetchCollection = async () => {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/collections/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const data = await res.json();

        if (!res.ok) throw new Error(data.message || "Failed to fetch collection");

        setFormData({
          title: data.title || "",
          price: data.price || "",
          category: data.category || "",
          description: data.description || "",
          sizes: data.sizes?.join(",") || "", // comma separated
          image: null,
        });

        if (data.image) setPreview(`http://127.0.0.1:8000/${data.image}`);
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchCollection();
  }, [id, token]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, image: files[0] }));
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const form = new FormData();
      form.append("_method", "PUT"); // required for Laravel
      form.append("title", formData.title);
      form.append("price",formData.price);
      form.append("category", formData.category);
      form.append("description", formData.description);
      const sizesArray = formData.sizes
  ? formData.sizes.split(",").map(s => s.trim())
  : [];

sizesArray.forEach(size => {
  form.append("sizes[]", size);
});

      if (formData.image) form.append("image", formData.image);

      const res = await fetch(`http://127.0.0.1:8000/api/collections/${id}`, {
        method: "POST", // Laravel PUT override via _method
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: form,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Update failed");

      alert("Collection updated successfully!");
      navigate("/admin/collection/showc");
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto my-10 bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Edit Collection</h1>

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
          <option value="">Select category</option>
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
          placeholder="Description"
          rows={4}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          name="sizes"
          value={formData.sizes}
          onChange={handleChange}
          placeholder="[Sizes (comma separated, e.g., S,M,L)]"
          className="w-full border p-2 rounded"
        />

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
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Updating..." : "Update Collection"}
        </button>
      </form>
    </div>
  );
};

export default Editc;
