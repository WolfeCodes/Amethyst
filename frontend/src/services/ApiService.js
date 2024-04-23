import axios from 'axios';

const EMAIL_CHECK_URL = 'http://localhost:8080/api/auth/emailCheck'; // Replace with your actual backend URL

const ApiService = {
  async checkEmail(email) {
    try {
      const response = await axios.get(EMAIL_CHECK_URL, {
        params: { email },
      });
      return response.data; // Return the response data (boolean or error object)
    } catch (error) {
      console.error('Error during email check:', error);
      throw new Error('An error occurred while checking email validity.'); // Throw a custom error
    }
  },
};

export default ApiService;