import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/donuts/';


// Define a function to fetch the list of donuts from the API
export const listDonuts = () => axios.get(REST_API_BASE_URL);
