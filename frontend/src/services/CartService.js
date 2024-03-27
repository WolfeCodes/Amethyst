import axios from "axios";
import { number } from "prop-types";

const REST_API_BASE_URL = 'http://localhost:8080/api/cart';

export const getUserCart = (cartId) => axios.get(REST_API_BASE_URL + '/' + cartId);