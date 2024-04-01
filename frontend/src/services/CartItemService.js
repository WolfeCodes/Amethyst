import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/cartItem/';

export const getCartItemById = (cartItemId) => axios.get(REST_API_BASE_URL + cartItemId);

export const updateCartItemQuantity = (cartItemId, quantity) => axios.put(REST_API_BASE_URL + cartItemId + '/' + 'quantity/' + quantity);