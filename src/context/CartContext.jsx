import React, { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add or update item in cart
  const addToCart = (product, size = null) => {
    const existing = cartItems.find(
      (item) => item.id === product.id && item.size === size
    );

    if (existing) {
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems((prev) => [
        ...prev,
        { ...product, size, quantity: 1 },
      ]);
    }
  };

  const removeFromCart = (id, size) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === id && item.size === size))
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
