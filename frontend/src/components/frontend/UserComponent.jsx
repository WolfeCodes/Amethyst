import React, { useState } from 'react';
import { loginUser, registerUser } from '../../services/UserService'; // Import loginUser and registerUser functions from UserService
import '../../styles/frontend/User.css'; // Import CSS file

const UserComponent = () => {
  // State variables for form data, login mode, logged in state, error message, and popup visibility
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // Event handlers for input changes
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Perform login or registration based on the selected mode (isLogin)
      if (isLogin) {
        // Call the loginUser function from the UserService
        const response = await loginUser(email, password);
        // Log the response data to the console
        console.log('Login submitted:', response.data);
        // Set the loggedIn state to true
        setLoggedIn(true);
      } else {
        // Call the registerUser function from the UserService
        const response = await registerUser(email, password);
        // Log the response data to the console
        console.log('Sign up submitted:', response.data);
        // Set the loggedIn state to true
        setLoggedIn(true);
      }
      // Show the popup message
      setShowPopup(true);
    } catch (error) {
      // If an error occurs, set the error state to the error message returned from the server
      setError(error.response.data.message);
    }
  };

  // Function to toggle between sign up and login modes
  const handleToggleMode = () => {
    // Toggle the isLogin state
    setIsLogin(!isLogin);
    // Reset other states when toggling modes
    setLoggedIn(false);
    setShowPopup(false);
    setError(null); // Reset error message state when toggling modes
  };

  // Function to close the popup message
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className={`user-container ${isLogin ? 'login-mode' : ''}`}>
      <h2>{isLogin ? 'Log In' : 'Sign Up'}</h2>
      {loggedIn && <p>You are logged in.</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        {/* Button text changes based on login mode */}
        <button
          type="submit"
          className={`signup-bt ${isLogin ? 'login' : ''}`}
        >
          {isLogin ? 'Login' : 'Sign up'}
        </button>
      </form>
      {/* Toggle button for switching between login and sign up modes */}
      <p>{isLogin ? 'Don\'t have an account? ' : 'Already have an account? '}
        <button type="button" onClick={handleToggleMode}>
          {isLogin ? 'Sign up' : 'Login'}
        </button>
      </p>
      {/* Display error message if there's an error */}
      {error && <p className="error">{error}</p>}
      {/* Show popup message when the user is logged in */}
      {showPopup && (
        <div className="popup">
          <p>Logged in successfully!</p>
          <button onClick={closePopup}>Close</button>
        </div>
      )}
    </div>
  );
};

export default UserComponent;
