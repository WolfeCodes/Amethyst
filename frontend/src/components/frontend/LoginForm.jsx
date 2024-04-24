import React, { useState, useContext } from 'react'
import { createUser, listUsers } from '../../services/UserService'; // Import createUser and listUsers functions from UserService
import { logIn } from '../../services/AuthenticationService';
import { LoginContext } from '../../contexts/LoginContext';
import '../../styles/frontend/User.css'; // Import CSS file


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
        //sends a POST request to LogIn API with email and password. 
        logIn(email, password).then((response) => {
          console.log(response.data);
          const realToken = response.data;
          //Storing token to get user information later. 
          localStorage.setItem("token", realToken.accessToken);
          SetUser(localStorage.getItem('token'));
        }).catch(error => {
          console.error(error);
        });
        if (user) {
          console.log('Login successful:', user);
          setLoggedIn(true);
          setShowPopup(false); // Hide the error popup
          setShowSignUpPopup(false); // Hide the sign up popup
          setShowPasswordPopup(false); // Hide the password popup
          setShowLoginSuccessPopup(true); // Show login success popup
        } else {
          setError('Invalid email or password.');
          setShowPopup(true);
          setShowSignUpPopup(false); // Hide the sign up popup
          setShowPasswordPopup(false); // Hide the password popup
          setShowLoginSuccessPopup(false); // Hide login success popup
        }
      } else {
        // Validate password length for sign-up only
        if (password.length < 5) {
          setError('Password must be at least 5 characters long.');
          setShowPasswordPopup(true); // Show the password popup
          return; // Exit the function
        }

        // Call listUsers function to get all users
        const response = await listUsers();
        const users = response.data;
        // Check if the entered email already exists
        const existingUser = users.find((user) => user.email === email);
        if (existingUser) {
          setError('An account with this email already exists. Please log in.');
          setShowPopup(true); // Show the error popup
          setShowSignUpPopup(false); // Hide the sign up popup
          setShowPasswordPopup(false); // Hide the password popup
          setShowLoginSuccessPopup(false); // Hide login success popup
        } else {
          // Call the createUser function from the UserService
          const response = await createUser({ email, password }); // Pass user data to createUser function
          console.log('Sign up submitted:', response.data);
          setLoggedIn(true);
          setShowSignUpPopup(true); // Show the sign up popup
          setShowPopup(false); // Hide the error popup
          setShowPasswordPopup(false); // Hide the password popup
          setShowLoginSuccessPopup(false); // Hide login success popup
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