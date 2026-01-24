import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Editk = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    title: "",
    department: "",
    location: "",
    description: "",
    deadline: "",
    type: "",
    status: "open",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Fetch vacancy by ID
  const fetchVacancy = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/api/vacancies/id/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) throw new Error("Unable to load vacancy details");

      setFormData({
        title: data.title || "",
        department: data.department || "",
        location: data.location || "",
        description: data.description || "",
        deadline: data.deadline || "",
        type: data.type || "",
        status: data.status || "open",
      });
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load vacancy");
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Update vacancy
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/vacancies/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Update failed");

      alert("Vacancy updated successfully!");
      navigate("/admin/careers/showk");
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    fetchVacancy();
  }, [id]);

  // 🔹 Loading / Error UI
  if (loading) return <p className="text-center mt-10">Loading details...</p>;

  return (
    <div className="max-w-3xl mx-auto my-10 bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Edit Vacancy</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Job Title"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="Department"
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="Location"
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Job Description"
          rows={5}
          className="w-full border p-2 rounded"
          required
        />

        <input
          type="date"
          name="deadline"
          value={formData.deadline}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        >
          <option value="">Select Type</option>
          <option value="Full-time">Full-time</option>
          <option value="Part-time">Part-time</option>
          <option value="Internship">Internship</option>
          <option value="Contract">Contract</option>
        </select>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>

        <button
          type="submit"
          disabled={saving}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          {saving ? "Updating..." : "Update Vacancy"}
        </button>
      </form>
    </div>
  );
};

export default Editk;
