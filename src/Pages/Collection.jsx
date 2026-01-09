import React, { useState } from "react";
import { Link } from "react-router-dom";
import f1 from '../assets/f1.jpg';
import d2 from '../assets/denim.jpg';
import dre from '../assets/dress.jpg';
import mas from '../assets/massagegun.jpeg';

const productsData = [
  {
    id: 1,
    title: "Men's Casual Shirt",
    price: "Ksh 1200",
    img: f1,
    category: "men",
    description: "A comfortable and stylish casual shirt perfect for everyday wear.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 2,
    title: "Denim T-shirt",
    price: "Ksh 1800",
    img: d2,
    category: "men",
    description: "Classic denim T-shirt with premium stitching for durability.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 3,
    title: "Women Dress",
    price: "Ksh 800",
    img: dre,
    category: "women",
    description: "Elegant and comfortable dress for all occasions.",
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: 4,
    title: "Massage Gun",
    price: "Ksh 5000",
    img: mas,
    category: "electronics",
    description: "High-power massage gun for muscle relief and recovery.",
    sizes: [],
  },
];

const categories = [
  "all",
  "men",
  "women",
  "children",
  "electronics",
];

const Collection = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts =
    selectedCategory === "all"
      ? productsData
      : productsData.filter(
          (item) => item.category === selectedCategory
        );

  return (
    <div className="my-10 px-4">
      <h1 className="text-center text-gray-600 font-bold text-2xl">
        Our Wide Collection
      </h1>

      {/* Filters */}
      <div className="flex justify-center gap-4 flex-wrap my-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded font-semibold transition ${
              selectedCategory === cat
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-green-100"
            }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            state={{ product }}
          >
            <div className="bg-white p-4 rounded shadow-md hover:shadow-lg transition cursor-pointer">
              <img
                src={product.img}
                alt={product.title}
                className="w-full h-48 object-cover rounded"
              />
              <h2 className="mt-2 font-semibold text-lg">
                {product.title}
              </h2>
              <p className="text-gray-600">{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Collection;
