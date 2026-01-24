import React, { useState, useContext } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { CartContext } from "../context/CartContext"; 

const ProductItem = () => {
  const { state } = useLocation();
  const { id } = useParams();

  const product = state?.product;
  const { addToCart } = useContext(CartContext); 

  const [selectedSize, setSelectedSize] = useState("");

  if (!product) {
    return (
      <div className="text-center mt-10 text-xl">
        Product not found or no product data provided.
      </div>
    );
  }

  const handleAddToCart = () => {
    
    if (product.sizes?.length > 0 && !selectedSize) {
      alert("Please select a size first!");
      return;
    }

    
    addToCart(product, selectedSize);
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-4 grid grid-cols-1 lg:grid-cols-2 gap-8">
    
      <div>
      <img
  src={`http://127.0.0.1:8000/${product.image}`}
  alt={product.title}
  className="w-full h-96 object-cover rounded-lg"
/>

      </div>

      
      <div className="flex flex-col justify-center space-y-4">
        <h1 className="text-3xl font-bold">{product.title}</h1>
        <p className="text-2xl text-gray-700">{product.price}</p>
        <p className="text-gray-600">{product.description}</p>

        {/* Size Selection (only if sizes exist) */}
        {product.sizes && product.sizes.length > 0 && (
          <div>
            <h2 className="font-semibold">Select Size:</h2>
            <div className="flex gap-3 mt-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 border rounded transition ${
                    selectedSize === size
                      ? "bg-green-500 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        )}

        
   <Link to='/cart'>
   
    <button
          onClick={handleAddToCart}
          className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition mt-4"
        >
          Add to Cart
        </button>
   
   </Link>    

       
      </div>
    </div>
  );
};

export default ProductItem;
