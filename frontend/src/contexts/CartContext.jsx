// CartContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { getTotalQuantity, getCartByUserId } from '../services/CartService';
import { LoginContext } from './LoginContext'; // Import LoginContext


export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartQuantity, setCartQuantity] = useState(0);
  const { user, SetUser } = useContext(LoginContext);
  const [cartId, setCartId] = useState();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      SetUser(token);
      getCartByUserId(token)
        .then(response => {
          console.log("Response from getCartByUserId:", response); // Log the entire response
          const cartIdFromResponse = response.data;
          setCartId(cartIdFromResponse);
          console.log("CartId in header", cartIdFromResponse);
          return getTotalQuantity(cartIdFromResponse); // Call getTotalQuantity with cartIdFromResponse
        })
        .then(totalQuantityResponse => {
          const totalQuantity = totalQuantityResponse.data; // Extract total quantity from the response
          setCartQuantity(totalQuantity); // Set the cart quantity state
          console.log("quantity", totalQuantity);
        })
        .catch(error => {
          console.error('Error fetching cart:', error);
        });
    }
  }, []);

  const updateCartQuantity = (quantity) => {
    setCartQuantity(quantity);
  };

  return (
    <CartContext.Provider value={{ cartQuantity, updateCartQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
