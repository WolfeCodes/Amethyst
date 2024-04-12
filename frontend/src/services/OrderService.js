import axios from "axios";

// Define the base URL of the REST API endpoint for donuts
const REST_API_BASE_URL = 'http://localhost:8080/api/order/';

// Function to fetch the list of orders from the REST API
export const listOrders = () => axios.get(REST_API_BASE_URL);
