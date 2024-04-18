import axios from "axios";

// Define the base URL of the REST API endpoint for donuts
const REST_API_BASE_URL = 'http://localhost:8080/api/order/';

const REST_API_PRICE_URL = 'http://localhost:8080/api/order/price/'

const REST_API_ITEM_URL = 'http://localhost:8080/api/orderItems/'
// Function to fetch the list of orders from the REST API
export const listOrders = () => axios.get(REST_API_BASE_URL);

export const getOrderPrice = (orderId) => axios.get(REST_API_PRICE_URL + orderId);

export const getOrderItems = (orderItemId) => axios.get(REST_API_ITEM_URL + orderItemId)

export const getOrderByUserId = (token) => {
    return axios.get(REST_API_BASE_URL, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  };
   
  