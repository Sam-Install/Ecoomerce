import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Showk = () => {
  const [vacancies, setVacancies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");


  const fetchVacancies = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/vacancies", {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to load vacancies");

      setVacancies(data.data || data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this vacancy?")) return;

    try {
      const res = await fetch(
        `http://127.0.0.1:8000/api/vacancies/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Delete failed");

      
      setVacancies((prev) => prev.filter((job) => job.id !== id));
    } catch (err) {
      alert(err.message || "Failed to delete vacancy");
    }
  };

  useEffect(() => {
    fetchVacancies();
  }, []);

  
  if (loading) return <p className="text-center mt-10">Loading vacancies...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto my-10 bg-white p-6 rounded shadow">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Job Vacancies</h1>

        <button
          onClick={() => navigate("/admin/careers/createk")}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          + Create Vacancy
        </button>
      </div>

      {vacancies.length === 0 ? (
        <p className="text-center text-gray-500">No vacancies found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Title</th>
                <th className="border p-2 text-left">Department</th>
                <th className="border p-2 text-left">Location</th>
                <th className="border p-2 text-left">Type</th>
                <th className="border p-2 text-left">Description</th>
                <th className="border p-2 text-left">Deadline</th>
                <th className="border p-2 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {vacancies.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50">
                  <td className="border p-2">{job.title}</td>
                  <td className="border p-2">{job.department}</td>
                  <td className="border p-2">{job.location}</td>
                  <td className="border p-2">{job.type}</td>

                  
                  <td className="border p-2 text-sm text-gray-700">
                    {job.description?.length > 80
                      ? job.description.slice(0, 80) + "..."
                      : job.description}
                  </td>

                  <td className="border p-2">{job.deadline}</td>

                  <td className="border p-2 text-center space-x-2">
                    <button
                      onClick={() =>
                        navigate(`/admin/careers/editk/${job.id}`)
                      }
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(job.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Showk;
