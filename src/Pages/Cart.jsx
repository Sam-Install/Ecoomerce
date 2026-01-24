import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, addToCart } = useContext(CartContext);

  
  const parsePrice = (price) => {
    
    return Number(price.toString().replace(/[^0-9.]/g, ""));
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + parsePrice(item.price) * item.quantity,
    0
  );

  
  const formatCurrency = (amount) =>
    new Intl.NumberFormat("en-KE", {
      style: "currency",
      currency: "KES",
      minimumFractionDigits: 2,
    }).format(amount);

  return (
    <div className="max-w-5xl mx-auto my-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">
          Your cart is empty.
        </p>
      ) : (
        <>
          <div className="space-y-6">
            {cartItems.map((item, i) => (
              <div
                key={`${item.id}-${item.size}-${i}`}
                className="bg-white p-4 rounded shadow flex flex-col sm:flex-row sm:items-center gap-4"
              >
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex flex-col">
                    <h2 className="font-semibold text-lg">{item.title}</h2>
                    {item.size && (
                      <p className="text-gray-600 text-sm">Size: {item.size}</p>
                    )}
                    <p className="text-gray-700 text-sm">
                      {formatCurrency(parsePrice(item.price))}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full sm:w-auto gap-3 mt-2 sm:mt-0">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => addToCart(item, item.size)}
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                    >
                      +
                    </button>

                    <span className="w-8 text-center">{item.quantity}</span>

                    <button
                      onClick={() => removeFromCart(item.id, item.size)}
                      className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                    >
                      –
                    </button>
                  </div>

                  <button
                    className="text-red-500 text-sm hover:underline"
                    onClick={() => removeFromCart(item.id, item.size)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-right">
            <p className="text-xl font-bold">
              Total: {formatCurrency(totalAmount)}
            </p>

            <Link to="/checkout">
              <button className="mt-4 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition">
                Proceed to Checkout
              </button>
            </Link>

            <Link to="/collection">
              <p className="text-black mt-2">Back To Collection</p>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
