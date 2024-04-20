// Import the Axios library for making HTTP requests
import axios from "axios";

// Define the base URL of the REST API endpoint for users
const REST_API_BASE_URL = 'http://localhost:8080/api/users/';

// Function to fetch the list of users from the REST API
export const listUsers = () => axios.get(REST_API_BASE_URL);

// Function to add a new user to the REST API
export const createUser = (user) => axios.post(REST_API_BASE_URL, user);

// Function to fetch a single user from the REST API based on its ID
export const getSingleUser = (userId) => axios.get(REST_API_BASE_URL + userId);

// Function to fetch all users from the REST API based on its name(imprecise search)
export const getUsersByname = (searchTerm) => axios.get(REST_API_BASE_URL, { params: { username: searchTerm } });

// Function to update a single user from the Database based on its ID
export const updateUser = (userId, user) => axios.put(REST_API_BASE_URL + userId, user);

// Function to delete a single user from the Database based on its ID
export const deleteUserById = (userId) => axios.delete(REST_API_BASE_URL + userId);

// Function to get user details with stored token
export const getUserInfo = (token) => axios.get(REST_API_BASE_URL + 'userInfo', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }); 