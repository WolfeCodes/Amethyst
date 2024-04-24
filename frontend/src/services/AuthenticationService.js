import axios from "axios";


// Define the base URL for the REST API
const REST_API_BASE_URL = 'http://localhost:8080/api/auth/login';

// Function to log in with email and password and make a POST request to the login endpoint with email and password in the request body
export const logIn = (email, password) => axios.post(REST_API_BASE_URL, { email, password });

