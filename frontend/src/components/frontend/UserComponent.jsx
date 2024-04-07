import React, { useState } from 'react';
import '../../styles/frontend/User.css'; // Import CSS file
import { logIn } from '../../services/AuthenticationService';

const UserComponent = () => {
  // State variables for form data and login mode
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(false);

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
    if (isLogin) {
      try{
        const response = await logIn(email, password);
        const token = response.data;
        sessionStorage.setItem('jwtToken', token);
        console.log(token);
      } catch (error) {
        console.error(error);
      }
      console.log('Login submitted:', { email, password });
    } else {
      console.log('Sign up submitted:', { email, password });
    }
  };

  // Function to toggle between sign up and login modes
  const handleToggleMode = () => {
    setIsLogin(!isLogin);
  };

  return (
    <div className={`user-container ${isLogin ? 'login-mode' : ''}`}>
      {/* Heading dynamically changes based on login mode */}
      <h2>{isLogin ? 'Log In' : 'Sign Up'}</h2>
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
      {/* Link text changes based on login mode */}
      <p>{isLogin ? 'Don\'t have an account? ' : 'Already have an account? '}
        <button type="button" onClick={handleToggleMode}>
          {isLogin ? 'Sign up' : 'Login'}
        </button>
      </p>
    </div>
  );
};

export default UserComponent;
