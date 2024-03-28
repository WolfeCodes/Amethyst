import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/api/donuts/';


// use the Axios library to make an HTTP GET request to fetch the list of donuts from the specified REST API endpoint.
export const listDonuts = () => axios.get(REST_API_BASE_URL);
