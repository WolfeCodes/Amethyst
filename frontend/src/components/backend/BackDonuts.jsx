import React, { useEffect, useState } from 'react';
import '../../styles/backend/BackDonuts.css';
import { deleteDonutById, listDonuts } from '../../services/DonutService';
import AddDonutsModal from './AddDonutsModal'


const BackDonuts = () => {

  const [donuts, setDonuts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // useEffect hook to fetch the list of donuts when the component mounts
  useEffect(() => {
    listDonuts()
      .then((response) => {
        setDonuts(response.data);
      })
      .catch((error) => {
        console.error(error)
      })
  })

  function removeDonut(id) {
    const confirmed = window.confirm("Are you sure you want to delete this donut?")
    if (confirmed) {
      deleteDonutById(id).then((response) =>{

      }).catch(error => {
        console.error(error);
      })
    }
  }


  return (
    <div className="backcontainer">
      <div className="row">
        <div className="col-md-6">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search donut name"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            />
            <button className="btn btn-outline-secondary" type="button" id="button-addon2">
              Search
            </button>
          </div>
        </div>
        <div className="col-md-6">
          <button type="button" className="btn btn-primary" id="adddonuts" onClick={() => setShowModal(true)}>
            Add Donuts
          </button>
          {showModal && <AddDonutsModal closeModal={setShowModal} />}
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
                <td>{index + 1}</td>
                <td>{donut.name}</td>
                <td><img src={donut.imageUrl} className='table-img' /></td>
                <td>{donut.description}</td>
                <td>{donut.price}</td>
                <td>{donut.rating}</td>
                <td>
                  <button className='btn btn-info'>Update</button>
                  <button className='btn btn-danger' onClick={() => removeDonut(donut.id)}>Delete</button>
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