// UserComponent.jsx

import React, { useState } from 'react';
import '../../styles/frontend/User.css'; // Import CSS file

const UserComponent = () => {
  // State variables for form data
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Event handlers for form inputs
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here, you can perform form validation and submission logic
    console.log('Form submitted:', { email, password });
  };

  return (
    <div className="user-container">
      <h2>Sign Up</h2>
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
        {/* Button with the 'signup-bt' class */}
        <button type="submit" className="signup-bt">Sign up</button>
      </form>
    </div>
  );
};

export default UserComponent;
