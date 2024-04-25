// Import necessary modules and services
import React, { createContext, useState, useContext, useEffect } from 'react';
import { getTotalQuantity, getCartByUserId } from '../services/CartService';
import { LoginContext } from './LoginContext'; // Import LoginContext

// Create a CartContext to manage cart-related state and functionality
export const CartContext = createContext();

// CartProvider component responsible for managing cart state and providing it to child components
export const CartProvider = ({ children }) => {
  // Define state variables to track cart quantity and user information
  const [cartQuantity, setCartQuantity] = useState(0);
  const { user, SetUser } = useContext(LoginContext);
  const [cartId, setCartId] = useState();

  // useEffect hook to fetch cart information when component mounts
  useEffect(() => {
    // Retrieve token from local storage
    const token = localStorage.getItem("token");
    // If token exists, set user context
    if (token) {
      SetUser(token);
      // Call API to get cart information based on user token
      getCartByUserId(token)
        .then(response => {
          // Log the response for debugging purposes
          console.log("Response from getCartByUserId:", response);
          // Extract cart ID from the response
          const cartIdFromResponse = response.data;
          // Set the cart ID state variable
          setCartId(cartIdFromResponse);
          // Call API to get total quantity of items in the cart
          return getTotalQuantity(cartIdFromResponse);
        })
        .then(totalQuantityResponse => {
          // Extract total quantity from the response
          const totalQuantity = totalQuantityResponse.data;
          // Update cart quantity state variable
          setCartQuantity(totalQuantity);
          // Log total quantity for debugging purposes
          console.log("quantity", totalQuantity);
        })
        .catch(error => {
          // Log any errors that occur during the process
          console.error('Error fetching cart:', error);
        });
    }
  }, []);

  // Function to update cart quantity
  const updateCartQuantity = (quantity) => {
    setCartQuantity(quantity);
  };


  // Function to clear cart quantity
  const clearCartQuantity = () => {
    setCartQuantity(0);
  };

  // Provide cart state and functionality to child components
  return (
    <CartContext.Provider value={{ cartQuantity, updateCartQuantity, clearCartQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to access cart context within components
export const useCart = () => {
  return useContext(CartContext);
};
