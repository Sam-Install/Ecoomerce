import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";

const CheckOut = () => {
  const { cartItems } = useContext(CartContext);

  const totalAmount = cartItems.reduce(
    (sum, item) =>
      sum + parseFloat(item.price.replace(/\D/g, "")) * item.quantity,
    0
  );

  const [paymentMethod, setPaymentMethod] = useState("cod"); // default = Cash on Delivery

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order submitted! Thank you for shopping with us.");
    // Here you can send to backend or clear cart etc.
  };

  return (
    <div className="max-w-5xl mx-auto my-10 px-4 space-y-8">
      
      <h1 className="text-3xl font-bold text-center text-orange-400">
        Delivery <span className="text-gray-700">Information</span>
      </h1>

    
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
    
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 rounded shadow"
        >
          <h2 className="text-xl font-bold text-gray-700 mb-2">
            Enter Your Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded w-full"
              required
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="border border-gray-300 px-3 py-2 rounded w-full"
              required
            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded w-full"
            required
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded w-full"
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="border border-gray-300 px-3 py-2 rounded w-full"
            required
          />
        </form>

        
        <div className="space-y-4">
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold text-gray-700 mb-2">
              Order Summary
            </h2>
            <p className="text-gray-800">
              Total Items: <span className="font-semibold">{cartItems.length}</span>
            </p>
            <p className="text-gray-800">
              Total Amount:{" "}
              <span className="font-bold text-lg">
                Ksh {totalAmount.toLocaleString()}
              </span>
            </p>
          </div>

          <div className="bg-white p-6 rounded shadow space-y-2">
            <h2 className="text-xl font-bold text-gray-700">
              Select Payment Method
            </h2>

        
            <button
              type="button"
              onClick={() => setPaymentMethod("cod")}
              className={`flex items-center gap-3 w-full px-4 py-2 rounded border transition ${
                paymentMethod === "cod"
                  ? "bg-green-100 border-green-500"
                  : "bg-white border-gray-300 hover:bg-gray-50"
              }`}
            >
              <span
                className={`w-3 h-3 rounded-full ${
                  paymentMethod === "cod" ? "bg-green-500" : "bg-gray-300"
                }`}
              ></span>
              <span>Payment on Delivery</span>
            </button>

            
            <button
              type="button"
              onClick={() => setPaymentMethod("mpesa")}
              className={`flex items-center gap-3 w-full px-4 py-2 rounded border transition ${
                paymentMethod === "mpesa"
                  ? "bg-green-100 border-green-500"
                  : "bg-white border-gray-300 hover:bg-gray-50"
              }`}
            >
              <span
                className={`w-3 h-3 rounded-full ${
                  paymentMethod === "mpesa" ? "bg-green-500" : "bg-gray-300"
                }`}
              ></span>
              <span>Lipa na M-Pesa</span>
            </button>

            
            <button
              type="button"
              onClick={() => setPaymentMethod("paypal")}
              className={`flex items-center gap-3 w-full px-4 py-2 rounded border transition ${
                paymentMethod === "paypal"
                  ? "bg-green-100 border-green-500"
                  : "bg-white border-gray-300 hover:bg-gray-50"
              }`}
            >
              <span
                className={`w-3 h-3 rounded-full ${
                  paymentMethod === "paypal" ? "bg-green-500" : "bg-gray-300"
                }`}
              ></span>
              <span>PayPal</span>
            </button>
          </div>

          
          <button
            onClick={handleSubmit}
            className="bg-green-400 text-white px-6 py-3 rounded hover:bg-gray-600 transition w-full"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;
