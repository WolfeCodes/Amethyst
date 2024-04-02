import axios from "axios";
import { number } from "prop-types";

const REST_API_BASE_URL = 'http://localhost:8080/api/cart';

export const getUserCart = (cartId) => axios.get(REST_API_BASE_URL + '/' + cartId);

export const addDonutToCart = (cartId, donutId) => axios.put(REST_API_BASE_URL + '/' + cartId + '/donut/' + donutId);

export const getCartTotal = (cartId) => axios.get(REST_API_BASE_URL + '/' + cartId + '/total');