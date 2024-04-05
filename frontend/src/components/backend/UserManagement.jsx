import React, { useEffect, useState } from 'react';
import { listUsers } from '../../services/UserService';
import UsersModal from './UsersModal';


const UserManagement = () => {

  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null); // State to store the selected donut id
  const [searchTerm, setSearchTerm] = useState("");


  // useEffect hook to fetch the list of donuts when the component mounts
  useEffect(() => {
    listAllUsers(); // Fetch all donuts when the component mounts
  }, []);

  // Function to list all users
  const listAllUsers = () => {
    listUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  // Function to list search users
  function handleSearch() {
    if (searchTerm !== '') { // Ensure searchTerm is not empty
      getUsersByname(searchTerm)
        .then((response) => {
          setDonuts(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      listAllUsers(); // If searchTerm is empty, list all donuts
    }
  }

  //Edit selected donut
  function updateUser(id) {
    setSelectedUserId(id); // Set the selected donut id
    console.log("selected DonutId " + selectedUserId);
    setShowModal(true); // Open the modal
  }

  //Add a new donut
  function addUser() {
    setSelectedUserId(null); // Reset the selected donut id
    setShowModal(true); // Open the modal
  }

  //Delete selected donut
  function removeUser(id) {
    const confirmed = window.confirm("Are you sure you want to delete this donut?")
    if (confirmed) {
      deleteUserById(id).then((response) => {
      }).catch(error => {
        console.error(error);
      })
    }
  }

  return (
    <div className="backcontainer">
      <div className="row">
        <div className="col-md-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search donut name"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value.toString())}
            />
            <button className="btn btn-outline-primary" type="button" id="button-addon2" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
        <div className="col-md-6">
          <button type="button" className="btn btn-primary" id="adddonuts" onClick={() => { addUser() }}>
            Add User
          </button>
          {showModal && (
            <UsersModal closeModal={() => setShowModal(false)} selectedUserId={selectedUserId} />
          )}
        </div>
      </div>

      <div className="table-responsive">
        <table className="table">
          <thead className="table-light">
            <tr>
              <th>Id</th>
              <th>User Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td style={{ width: '60px' }}>{index + 1}</td>
                <td style={{ width: '250px' }}>{user.username}</td>
                <td style={{ width: '350px' }}>{user.email}</td>
                <td style={{ width: '350px' }}>{user.role}</td>
                <td >
                  <button className="btn btn-link" onClick={() => { updateUser(user.id) }}>
                    Edit
                  </button>
                  {showModal && <UsersModal closeModal={() => setShowModal(false)} id={selectedUserId} />}
                  <button className="btn btn-link" onClick={() => removeUser(user.id)}>Delete</button>
                </td>
              </tr>

            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserManagement
