import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Show = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Fetch all products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/latest", {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch products");
      setProducts(data);
    } catch (err) {
      console.error(err);
      setError(err.message || "Error fetching products");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`http://127.0.0.1:8000/api/latest/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
        },
      });

      if (!res.ok) throw new Error("Failed to delete product");
      
      // Refresh list
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
      alert(err.message || "Delete failed");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading products...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-6xl mx-auto my-10 p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold mb-6 text-center">Your Products</h1>

      {products.length === 0 ? (
        <p className="text-center text-gray-600">No products created yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="border rounded-lg shadow p-4 flex flex-col">
              {product.image && (
                <img
                  src={`http://127.0.0.1:8000/${product.image}`}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded"
                />
              )}
              <h2 className="text-xl font-semibold mt-2">{product.title}</h2>
              <p className="text-gray-700 mt-1">Ksh {Number(product.price).toLocaleString()}</p>
              <p className="text-gray-600 mt-1">
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </p>

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => navigate(`/admin/latest/edit/${product.id}`)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
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

export default Show;
