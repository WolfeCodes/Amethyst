import axios from "axios";

// Define the base URL of the REST API endpoint for orders
const REST_API_BASE_URL = 'http://localhost:8080/api/order/';

// Define the base URL of the REST API endpoint for retrieving order price
const REST_API_PRICE_URL = 'http://localhost:8080/api/order/price/';

// Define the base URL of the REST API endpoint for retrieving order items
const REST_API_ITEM_URL = 'http://localhost:8080/api/orderItems/';

// Function to fetch the list of orders from the REST API
export const listOrders = () => axios.get(REST_API_BASE_URL);

// Function to fetch the price of a specific order
export const getOrderPrice = (orderId) => axios.get(REST_API_PRICE_URL + orderId);

// Function to fetch details of a specific order item
export const getOrderItems = (orderItemId) => axios.get(REST_API_ITEM_URL + orderItemId);
