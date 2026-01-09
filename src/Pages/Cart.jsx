import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const Cart = () => {
  const { cartItems, removeFromCart, addToCart } = useContext(CartContext);

  // calculate total dynamically
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price.replace(/\D/g, "")) * item.quantity,
    0
  );

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
          <div className="space-y-4">
            {cartItems.map((item, i) => (
              <div
                key={`${item.id}-${item.size}-${i}`}
                className="flex items-center justify-between bg-white p-4 rounded shadow"
              >
                {/* product image + details */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div>
                    <h2 className="font-semibold">{item.title}</h2>
                    {item.size && (
                      <p className="text-gray-600">Size: {item.size}</p>
                    )}
                    <p className="text-gray-700">{item.price}</p>
                  </div>
                </div>

                {/* quantity selector */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      addToCart(
                        item,
                        item.size
                      ) /* + increases quantity */
                    }
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    +
                  </button>

                  <div className="w-8 text-center">{item.quantity}</div>

                  <button
                    onClick={() =>
                      item.quantity > 1
                        ? removeFromCart(item.id, item.size) /* decrease */
                        : removeFromCart(item.id, item.size) /* remove if 1 */
                    }
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                  >
                    -
                  </button>
                </div>

                {/* remove button */}
                <button
                  className="text-red-500"
                  onClick={() =>
                    removeFromCart(item.id, item.size)
                  }
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          {/* total and checkout */}
          <div className="mt-6 text-right">
            <p className="text-xl font-bold">
              Total: Ksh {totalAmount.toLocaleString()}
            </p>

            <Link to="/checkout">
              <button className="mt-4 bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
