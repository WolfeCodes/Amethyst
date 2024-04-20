import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/cart';

// axios.interceptors.request.use(
//     config => {
//       const token = getCartTotal();
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//       return config;
//     },
//     error => {
//       return Promise.reject(error);
//     }
//   );

export const getUserCart = (cartId) => axios.get(REST_API_BASE_URL + '/' + cartId);

export const addDonutToCart = (cartId, donutId) => axios.put(REST_API_BASE_URL + '/' + cartId + '/donut/' + donutId);

export const getCartTotal = (cartId) => axios.get(REST_API_BASE_URL + '/' + cartId + '/total');

export const getTotalQuantity = (cartId) => axios.get(REST_API_BASE_URL + '/' + cartId + '/totalQuantity');

export const checkoutCart = (cartId) => axios.get(REST_API_BASE_URL + '/' + cartId + '/checkout');

export const getCartByUserId = (token) => axios.get(REST_API_BASE_URL + '/cartId', {
  headers: {
    Authorization: `Bearer ${token}`
  }
}); 
