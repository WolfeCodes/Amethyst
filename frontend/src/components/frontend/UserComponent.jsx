import React, { useState } from 'react';
import { createUser, listUsers } from '../../services/UserService'; // Import createUser and listUsers functions from UserService
import '../../styles/frontend/User.css'; // Import CSS file

const UserComponent = () => {
  // State variables for form data, login mode, logged in state, error message, and popup visibility
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false); // State to track if the user is in login or sign up mode
  const [loggedIn, setLoggedIn] = useState(false); // State to track if the user is logged in
  const [error, setError] = useState(null); // State to store error message
  const [showPopup, setShowPopup] = useState(false); // State to control the visibility of the success popup

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
        // Implement loginUser function
        // You can handle login logic here
      } else {
        // Call the createUser function from the UserService
        const response = await createUser({ email, password }); // Pass user data to createUser function
        console.log('Sign up submitted:', response.data);
        setLoggedIn(true);
      }
      setShowPopup(true); // Show the success popup after successful submission
    } catch (error) {
      setError(error.response.data.message); // Set error message if there's an error
    }
  };

  // Function to toggle between sign up and login modes
  const handleToggleMode = () => {
    setIsLogin(!isLogin); // Toggle the isLogin state
    setLoggedIn(false); // Reset loggedIn state when toggling modes
    setShowPopup(false); // Hide the success popup when toggling modes
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
        <button
          type="submit"
          className={`signup-bt ${isLogin ? 'login' : ''}`}
        >
          {isLogin ? 'Login' : 'Sign up'}
        </button>
      </form>
      <p>{isLogin ? 'Don\'t have an account? ' : 'Already have an account? '}
        <button type="button" onClick={handleToggleMode}>
          {isLogin ? 'Sign up' : 'Login'}
        </button>
      </p>
      {error && <p className="error">{error}</p>} {/* Display error message if there's an error */}
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

