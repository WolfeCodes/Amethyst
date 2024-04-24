import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/auth/login';

export const logIn = (email, password) => axios.post(REST_API_BASE_URL, {email, password});

