import React, { useEffect, useState } from "react";

const Careers = () => {
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const token = localStorage.getItem("token"); 
  const fetchVacancies = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/vacancies");
      const data = await res.json();

      if (!res.ok) throw new Error("Failed to fetch vacancies");

      setVacancies(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Unable to load vacancies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVacancies();
  }, []);

  const openForm = (job) => {
    setSelectedJob(job);
    setShowForm(true);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Application:", formData, selectedJob);
    alert("Application submitted! We'll contact you soon.");
    setFormData({ name: "", email: "", phone: "", message: "" });
    setShowForm(false);
  };

  if (loading) return <p className="text-center mt-10">Loading vacancies...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center text-green-600">
        Careers at SamsStore
      </h1>
      <p className="text-center text-gray-700">
        Join our team! See the open positions below and apply.
      </p>

      <div className="grid gap-6">
        {vacancies.map((job) => (
          <div
            key={job.id}
            className="border border-gray-300 rounded-lg p-4 hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{job.title}</h2>
            <p className="text-gray-600">{job.location}</p>
            <p className="mt-2 text-gray-700">{job.description}</p>
            <button
              onClick={() => openForm(job)}
              className="mt-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <button
              className="absolute top-3 right-3 text-gray-600"
              onClick={() => setShowForm(false)}
            >
              &#10005;
            </button>

            <h2 className="text-2xl font-bold text-center mb-4">
              Apply for {selectedJob?.title}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded"
                required
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded"
                required
              />

              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded"
                required
              />

              <textarea
                name="message"
                placeholder="Tell us about yourself"
                value={formData.message}
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded"
                rows="4"
                required
              ></textarea>

           <button
                type="submit"
                className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
              >
                Submit Application
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Careers;
