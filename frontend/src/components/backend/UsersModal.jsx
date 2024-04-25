import React, { useEffect, useState } from 'react'
import '../../styles/backend/Modal.css'
import { useNavigate } from 'react-router-dom';
import { createUser, getSingleUser, updateUser } from '../../services/UserService';

const UsersModal = ({ closeModal, id }) => {
  // State variables for managing user input and errors
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('User');
  const [errors, setErrors] = useState({
    username: '',
    email: ''
  })

  // React Router hook for navigation
  const navigator = useNavigate();

  // Effect to fetch user data when id changes
  useEffect(() => {
    if (id != null) {
      getSingleUser(id).then((response) => {
        setUsername(response.data.username);
        setEmail(response.data.email);
        setPassword(response.data.password);
        setRole(response.data.role);
      }).catch(error => {
        console.error(error);
      })
    }
  }, [id])

  // Function to handle form submission
  function saveOrUpdateUser(e) {
    e.preventDefault();
    if (validateForm()) {
      const user = { username, password, email, role };
      console.log(user);
      if (id != null) {
        // Update user if id exists
        updateUser(id, user).then((response) => {
          closeModal(false); // Close the modal after creating the donuts
          navigator('/backstage/UserManagement');
          window.location.reload(); // Reload the page after navigation

        }).catch(error => {
          console.error(error);
        })
      } else {
        // Create new user if id is null
        createUser(user).then((response) => {
          closeModal(false); // Close the modal after creating the donuts
          navigator('/backstage/UserManagement');
          window.location.reload(); // Reload the page after navigation
        }).catch(error => {
          console.error(error);
        })
      }
    }
  }

  // Function to determine the page title based on id
  function pageTitle() {
    if (id != null) {
      return <h1 className="modal-title fs-5" >Update User</h1>

    } else {
      return <h1 className="modal-title fs-5" >Add User</h1>
    }
  }

  // Function to validate form input
  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };

    if (username.trim()) {
      errorsCopy.username = '';
    } else {
      errorsCopy.username = 'Username is required';
      valid = false;
    }
    if (email.trim()) {
      errorsCopy.email = '';
    } else {
      errorsCopy.email = 'Email is required';
      valid = false;
    }
    setErrors(errorsCopy);
    return valid;
  }

  return (
    <div className="modal-container">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            {pageTitle()}
            <button
              type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => closeModal(false)}  >
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="col-form-label">User Name:</label>
                <input
                  type="text"
                  className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                  placeholder="Enter the user name"
                  name='userName'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && <div className='invalid-feedback'>{errors.username}</div>}
              </div>
              <div className="mb-3">
                <label className="col-form-label">Email:</label>
                <input
                  type="text"
                  className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                  placeholder="Enter user email"
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
              </div>
              <div className="mb-3">
                <label className="col-form-label">Role:</label>
                <select className="form-select" aria-label="Default select example" placeholder="Select user role" value={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => closeModal(false)}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={saveOrUpdateUser}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersModal