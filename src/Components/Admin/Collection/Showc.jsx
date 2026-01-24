import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Showc = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/collections", {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "Failed to fetch collections");

        setCollections(data);
      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, [token]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this collection?")) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/collections/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Delete failed");
      }

      setCollections((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      alert(err.message || "Failed to delete");
    }
  };

  if (loading) {
    return <p className="text-center mt-10 text-sm">Loading collections...</p>;
  }

  return (
    <div className="max-w-6xl mx-auto my-8 px-4">
      <h1 className="text-xl font-semibold mb-4 text-center">
        All Collections
      </h1>

      {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

      {collections.length === 0 ? (
        <p className="text-center text-gray-500 text-sm">
          No collections found.
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {collections.map((col) => (
            <div
              key={col.id}
              className="bg-white p-3 rounded-md shadow-sm hover:shadow transition"
            >
              {col.image && (
                <img
                  src={`http://127.0.0.1:8000/${col.image}`}
                  alt={col.title}
                  className="w-full h-28 object-cover rounded"
                />
              )}

              <h2 className="mt-2 text-sm font-semibold truncate">
                {col.title}
              </h2>

              <p className="text-xs text-gray-500">{col.category}</p>
              <p className="text-xs text-gray-700 font-medium">
                {col.price}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                {col.description?.length > 40
                  ? col.description.slice(0, 40) + "..."
                  : col.description}
              </p>

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() =>
                    navigate(`/admin/collection/editc/${col.id}`)
                  }
                  className="flex-1 text-xs bg-blue-500 text-white py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(col.id)}
                  className="flex-1 text-xs bg-red-500 text-white py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Showc;
