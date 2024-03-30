// Import the Axios library for making HTTP requests
import axios from "axios";

// Define the base URL of the REST API endpoint for donuts
const REST_API_BASE_URL = 'http://localhost:8080/api/donuts/';

// Function to fetch the list of donuts from the REST API
export const listDonuts = () => axios.get(REST_API_BASE_URL);

// Function to add a new donut to the REST API
export const createDonuts = (donut) => axios.post(REST_API_BASE_URL, donut);

// Function to fetch a single donut from the REST API based on its ID
export const getSingleDonut = (donutId) => axios.get(REST_API_BASE_URL + donutId);
