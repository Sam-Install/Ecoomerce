import { useEffect, useState } from "react";

const LatestProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/latest")
      .then(res => {
        if (!res.ok) throw new Error("API failed");
        return res.json();
      })
      .then(data => setProducts(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="text-center text-lg mt-6">Loading…</p>;
  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;

  return (
    <div className="my-12 px-4 mx-auto max-w-7xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="prata-regular text-4xl  text-orange-500">
          Latest Products
        </h1>
        <p className="text-gray-700 mt-2">
          We stock latest products & clothes often — check with us regularly.
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(p => (
          <div
            key={p.id}
            className="bg-white shadow rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            {p.image && (
              <img
                src={`http://127.0.0.1:8000/${p.image}`}
                alt={p.title}
                className="w-100 h-50 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="font-semibold text-lg text-gray-800">
                {p.title}
              </h3>
              <p className="mt-1 text-gray-700">Ksh {p.price}</p>
              <p className="mt-1 text-sm text-gray-500">
                {Number(p.stock) > 0 ? `${Number(p.stock)} in stock` : 'Out of stock' }
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestProducts;
