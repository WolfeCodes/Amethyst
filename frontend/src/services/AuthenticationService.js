import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/auth/login';
const DIFFERENT_URL = 'http://localhost:8080/api/auth/emailCheck?email='

export const logIn = (email, password) => axios.post(REST_API_BASE_URL, {email, password});

export const emailCheck = (email) => axios.get(DIFFERENT_URL + email)