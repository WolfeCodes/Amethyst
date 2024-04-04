import React, { useEffect, useState } from 'react';
import '../../styles/backend/BackDonuts.css';
import { deleteDonutById, listDonuts } from '../../services/DonutService';
import DonutsModal from './DonutsModal';

// import { useNavigate } from 'react-router-dom';

const BackDonuts = () => {

  const [donuts, setDonuts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDonutId, setSelectedDonutId] = useState(null); // State to store the selected donut id


  // useEffect hook to fetch the list of donuts when the component mounts
  useEffect(() => {
    listDonuts()
      .then((response) => {
        setDonuts(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.error(error)
      })
  })

  function updateDonut(id) {
    setSelectedDonutId(id); // Set the selected donut id
    console.log("selected DonutId " + selectedDonutId);
    setShowModal(true); // Open the modal
  }

  function addDonut() {
    setSelectedDonutId(null); // Reset the selected donut id
    setShowModal(true); // Open the modal
  }


  function removeDonut(id) {
    const confirmed = window.confirm("Are you sure you want to delete this donut?")
    if (confirmed) {
      deleteDonutById(id).then((response) => {

      }).catch(error => {
        console.error(error);
      })
    }
  }


  function handleSearch(event) {
    // Filter donuts based on search term
    let value = event.target.value.toLowerCase();
    let result = [];
    console.log(value);
    result = donuts.filter((donut) => {
      return donut.name.toLowerCase().includes(value);
    });
    setFilteredData(result);
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
              onChange={(event) => handleSearch(event)}
            />
            {/* <button className="btn btn-outline-primary" type="button" id="button-addon2">
              Search
            </button> */}
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