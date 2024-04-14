import React, { useEffect, useState } from 'react';
import '../../styles/backend/BackDonuts.css';
import { deleteDonutById, listDonuts, getDonutsByname } from '../../services/DonutService';
import DonutsModal from './DonutsModal';

const BackDonuts = () => {

  const [donuts, setDonuts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDonutId, setSelectedDonutId] = useState(null); // State to store the selected donut id
  const [searchTerm, setSearchTerm] = useState("");

  // useEffect hook to fetch the list of donuts when the component mounts
  useEffect(() => {
    listAllDonuts(); // Fetch all donuts when the component mounts
  }, []);

  // Function to list all donuts
  const listAllDonuts = () => {
    listDonuts()
      .then((response) => {
        setDonuts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  // Function to list search donuts
  function handleSearch() {
    if (searchTerm !== '') { // Ensure searchTerm is not empty
      getDonutsByname(searchTerm)
        .then((response) => {
          setDonuts(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      listAllDonuts(); // If searchTerm is empty, list all donuts
    }
  }

  //Edit selected donut
  function updateDonut(id) {
    setSelectedDonutId(id); // Set the selected donut id
    console.log("selected DonutId " + selectedDonutId);
    setShowModal(true); // Open the modal
  }

  //Add a new donut
  function addDonut() {
    setSelectedDonutId(null); // Reset the selected donut id
    setShowModal(true); // Open the modal
  }

  //Delete selected donut
  function removeDonut(id) {
    const confirmed = window.confirm("Are you sure you want to delete this donut?")
    if (confirmed) {
      deleteDonutById(id).then((response) => {
        window.location.reload(); // Refresh the page after deletion
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
          <button type="button" className="btn btn-primary" id="adddonuts" onClick={() => { addDonut() }}>
            Add Donuts
          </button>
          {showModal && (
            <DonutsModal closeModal={() => setShowModal(false)} selectedDonutId={selectedDonutId} />
          )}
        </div>
      </div>

      <div className="table-responsive">
        <table className="table">
          <thead className="table-light">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Image</th>
              <th>Description</th>
              <th>Price</th>
              <th>rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {donuts.map((donut, index) => (
              <tr key={index}>
                <td style={{ width: '40px' }}>{index + 1}</td>
                <td style={{ width: '250px' }}>{donut.name}</td>
                <td style={{ width: '40px' }}><img src={donut.imageUrl} className='table-img' /></td>
                <td style={{ width: '550px' }}>{donut.description}</td>
                <td>{donut.price}</td>
                <td style={{ width: '40px' }}>{donut.rating}</td>
                <td >
                  <button className="btn btn-link" onClick={() => { updateDonut(donut.id) }}>
                    Edit
                  </button>
                  {showModal && <DonutsModal closeModal={() => setShowModal(false)} id={selectedDonutId} />}
                  <button className="btn btn-link" onClick={() => removeDonut(donut.id)}>Delete</button>
                </td>
              </tr>

            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BackDonuts;