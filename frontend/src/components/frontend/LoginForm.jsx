import React, { useState, useContext } from 'react'
import { createUser, listUsers } from '../../services/UserService'; // Import createUser and listUsers functions from UserService
import { logIn } from '../../services/AuthenticationService';
import { LoginContext } from '../../contexts/LoginContext';
import '../../styles/frontend/User.css'; // Import CSS file
import ApiService from '../../services/ApiService'; // Import ApiService

const LoginForm = () => {

  const [isLogin, setIsLogin] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showSignUpPopup, setShowSignUpPopup] = useState(false); // State for sign up popup
  const [showPasswordPopup, setShowPasswordPopup] = useState(false); // State for password popup
  const [showLoginSuccessPopup, setShowLoginSuccessPopup] = useState(false); // State for login success popup
  const { user, SetUser } = useContext(LoginContext);

  
  // Event handlers for input changes
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Perform login or registration based on the selected mode (isLogin)
      if (isLogin) {
        try {
          const response = await logIn(email, password);
          console.log(response.data);
          const realToken = response.data;
          localStorage.setItem("token", realToken.accessToken);
          SetUser(localStorage.getItem('token'));
          setLoggedIn(true);
          setShowPopup(false); // Hide the error popup
          setShowSignUpPopup(false); // Hide the sign up popup
          setShowPasswordPopup(false); // Hide the password popup
          setShowLoginSuccessPopup(true); // Show login success popup
        } catch (error) {
          console.error(error);
          setError(error.response.data.message || 'Login failed. Please try again.'); // Set a default error message
          setShowPopup(true); // Show the error popup
        }
      } else {
        // Validate password length for sign-up only
        if (password.length < 5) {
          setError('Password must be at least 5 characters long.');
          setShowPasswordPopup(true); // Show the password popup
          return; // Exit the function
        }
  
        event.preventDefault();
        try {
          // ... existing code for login or signup logic ...
      
          // Check if email is undefined
          if (!email) {
            setError('Please enter your email address.');
            setShowPopup(true);
            return; // Exit the function if email is undefined
          }
      
          // Client-side validation (optional)
          if (!isValidEmail) {
            setError('Invalid email format.'); // Adjust error message as needed
            setShowPopup(true);
            return;
          }
      
          try {
            const isValid = await ApiService.checkEmail(email);
            if (!isValid) {
              setError('Email might be from a temporary domain. Please use a valid email address.');
              setShowPopup(true);
              // Set a flag indicating failed API call
              const apiCallFailed = true;
              return; // Exit the function
            }
          } catch (error) {
            console.error('Error during email check:', error);
            setError(error.message); // Use the custom error message from ApiService (if applicable)
            setShowPopup(true);
            // Set a flag indicating failed API call
            const apiCallFailed = true;
            return; // Exit the function
          }
          
      
          // Rest of your signup logic (e.g., create user on backend)
        } catch (error) {
          // Handle other errors
          console.error(error);
          setError('An error occurred during signup. Please try again later.');
          setShowPopup(true);
        }
        // Check if the entered email already exists (handle potential CORS)
        try {
          const userListResponse = await listUsers(); // Potential CORS issue here
          const users = userListResponse.data;
          const existingUser = users.find((user) => user.email === email);
          if (existingUser) {
            setError('An account with this email already exists. Please log in.');
            setShowPopup(true); // Show the error popup
            setShowSignUpPopup(false); // Hide the sign up popup
            setShowPasswordPopup(false); // Hide the password popup
            setShowLoginSuccessPopup(false); // Hide login success popup
          } else {
            // Call the createUser function from the UserService
            if (!apiCallFailed) {
              try {
                const response = await createUser({ email, password });
                console.log('Sign up submitted:', response.data);
                // ... (handle successful signup) ...
              } catch (error) {
                console.error('Error creating user:', error);
                // ... (handle signup errors) ...
              }
            } else {
              // API call failed, prevent account creation
              setError('An error occurred while verifying your email. Please try again later.');
              setShowPopup(true);
            } // Pass user data to createUser function
            console.log('Sign up submitted:', response.data);
            setLoggedIn(true);
            setShowSignUpPopup(true); // Show the sign up popup
            setShowPopup(false); // Hide the error popup
            setShowPasswordPopup(false); // Hide the password popup
            setShowLoginSuccessPopup(false); // Hide login success popup
          }
        } catch (error) {
          console.error('Error fetching user list:', error);
          // Handle errors while fetching the user list (optional)
          setError('An error occurred while checking users. Please try again later.');
          setShowPopup(true); // Show the error popup
        }
      }
    } catch (error) {
      setError(error.response.data.message); // Set error message if there's an error
      setShowPopup(true); // Show the error popup
      setShowSignUpPopup(false); // Hide the sign up popup
      setShowPasswordPopup(false); // Hide the password popup
      setShowLoginSuccessPopup(false); // Hide login success popup
    }
  

  };

  const handleToggleMode = () => {
    // Toggle the isLogin state
    setIsLogin(!isLogin);
    // Reset other states when toggling modes
    setLoggedIn(false);
    setShowPopup(false);
    setShowSignUpPopup(false);
    setShowPasswordPopup(false);
    setError(null); // Reset error message state when toggling modes
    setShowLoginSuccessPopup(false); // Hide login success popup
  };

  // Function to close the popup message
  const closePopup = () => {
    setShowPopup(false);
    setShowSignUpPopup(false);
    setShowPasswordPopup(false);
    setShowLoginSuccessPopup(false);
  };



  return (
    <div className={`user-container ${isLogin ? 'login-mode' : ''}`}>
      <h2>{isLogin ? 'Log In' : 'Sign Up'}</h2>
      {loggedIn && !isLogin && <p>You are logged in.</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
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
      <p className='reminder'>{isLogin ? 'Don\'t have an account? ' : 'Already have an account? '}
        <button type="button" onClick={handleToggleMode}>
          {isLogin ? 'Sign up' : 'Login'}
        </button>
      </p>
      {/* Display error message if there's an error */}
      {error && showPopup && (
        <div className="popup">
          <p>{error}</p>
          <button onClick={closePopup}>Close</button>
        </div>
      )}
      {/* Show sign up popup message after successful sign up */}
      {showSignUpPopup && (
        <div className="popup">
          <p>Signed up successfully!</p>
          <button onClick={closePopup}>Close</button>
        </div>
      )}
      {/* Show password popup message if password is too short */}
      {showPasswordPopup && (
        <div className="popup">
          <p>Password must be at least 5 characters long.</p>
          <button onClick={closePopup}>Close</button>
        </div>
      )}
      {/* Show login success popup message after successful login */}
      {showLoginSuccessPopup && (
        <div className="popup">
          <p>Login successful!</p>
          <button onClick={closePopup}>Close</button>
        </div>
      )}
    </div>
  )
}

export default LoginForm;