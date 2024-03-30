import React, { useState } from 'react'
import '../../styles/backend/Modal.css'
import { createDonuts } from '../../services/DonutService';
import { useNavigate } from 'react-router-dom';


const AddDonutsModal = ({ closeModal }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  const navigator = useNavigate();

  function saveDonut(e) {
    e.preventDefault();

    const donut = { name, price, imageUrl, description, rating: 5 };
    console.log(donut);

    createDonuts(donut).then((response) => {
      console.log(response.data);
      navigator('/backdonuts');
    })
  }

  return (
    <div className="modal-container">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" >Add Donuts</h1>
            <button
              type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => closeModal(false)}  >
            </button>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="col-form-label">Name:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter the donut name"
                  name='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="col-form-label">Price:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter the donut price"
                  name='price'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="col-form-label">Image Url:</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter the image URL"
                  name='imageUrl'
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="col-form-label" >Description:</label>
                <textarea
                  className="form-control"
                  placeholder="Enter the donut description"
                  name='description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
            </form>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => closeModal(false)}>
              Close
            </button>
            <button type="button" className="btn btn-primary" onClick={saveDonut}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddDonutsModal