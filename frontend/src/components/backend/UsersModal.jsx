import React, { useEffect, useState } from 'react'
import '../../styles/backend/Modal.css'
import { useNavigate } from 'react-router-dom';
import { createUser, getSingleUser, updateUser } from '../../services/UserService';

const UsersModal = ({ closeModal, id }) => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');

  const navigator = useNavigate();

  useEffect(() => {
    if (id != null) {
      getSingleUser(id).then((response) => {
        console.log(response.data);
        setUserName(response.data.username);
        setEmail(response.data.email);
        setRole(response.data.role);
      }).catch(error => {
        console.error(error);
      })
    }
  }, [id])

  function saveOrUpdateUser(e) {
    e.preventDefault();
    const user = { userName, email, role };
    console.log(user);
    if (id != null) {
      updateUser(id, user).then((response) => {
        console.log(response.data);
        closeModal(false); // Close the modal after creating the donuts
        navigator('/backstage/UserManagement');
      }).catch(error => {
        console.error(error);
      })
    } else {
      createUser(user).then((response) => {
        console.log(response.data);
        closeModal(false); // Close the modal after creating the donuts
        navigator('/backstage/UserManagement');
      }).catch(error => {
        console.error(error);
      })
    }
  }

  function pageTitle() {
    if (id != null) {
      return <h1 className="modal-title fs-5" >Update User</h1>

    } else {
      return <h1 className="modal-title fs-5" >Add User</h1>
    }
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
                  className="form-control"
                  placeholder="Enter the user name"
                  name='userName'
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="col-form-label">Email:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter user email"
                  name='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="col-form-label">Role:</label>
                <select className="form-select" aria-label="Default select example">
                  <option selected>Select user role</option>
                  <option value="1">User</option>
                  <option value="2">Admin</option>
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