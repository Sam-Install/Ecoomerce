import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const categories = ["all", "men", "women", "children", "electronics"];

const Collection = () => {
  const [collections, setCollections] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/collections", {
          headers: {
            Accept: "application/json",
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to fetch collections");
        }

        setCollections(data);
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchCollections();
  }, []);

  const filteredCollections =
    selectedCategory === "all"
      ? collections
      : collections.filter(item => item.category === selectedCategory);

  if (loading) {
    return <p className="text-center mt-10">Loading collections...</p>;
  }

  if (error) {
    return <p className="text-center mt-10 text-red-500">{error}</p>;
  }

  return (
    <div className="my-10 px-4">
      <h1 className="text-center text-gray-600 font-bold text-2xl mb-6">
        Our Wide Collection
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        
        <div className="md:w-1/5 flex flex-col gap-2">
          {categories.map(cat => (
            <div
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`border rounded px-2 py-1 text-center text-sm cursor-pointer transition
                ${
                  selectedCategory === cat
                    ? "bg-green-500 text-white border-green-500"
                    : "bg-white text-gray-700 hover:bg-green-100 hover:border-green-300 border-gray-300"
                }`}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </div>
          ))}
        </div>

        
        <div className="md:w-4/5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredCollections.map(product => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              state={{ product }}
            >
              <div className="bg-white p-3 rounded shadow-md hover:shadow-lg transition cursor-pointer">
                {product.image && (
                  <img
                    src={`http://127.0.0.1:8000/${product.image}`}
                    alt={product.title}
                    className="w-50 h-50 object-cover rounded"
                  />
                )}
                <h2 className="mt-2 font-semibold text-lg">{product.title}</h2>
                <p className="text-gray-600">Ksh {product.price}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Collection;
