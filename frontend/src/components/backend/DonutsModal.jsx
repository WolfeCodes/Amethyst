import React, { useEffect, useState } from 'react'
import '../../styles/backend/Modal.css'
import { createDonuts, getSingleDonut, updateDonut } from '../../services/DonutService';
import { useNavigate, useParams } from 'react-router-dom';


const DonutsModal = ({ closeModal, id }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  const navigator = useNavigate();

  useEffect(() => {
    if (id != null) {
      getSingleDonut(id).then((response) => {
        console.log(response.data);
        setName(response.data.name);
        setPrice(response.data.price);
        setImageUrl(response.data.imageUrl);
        setDescription(response.data.description);
      }).catch(error => {
        console.error(error);
      })
    }
  }, [id])

  function saveOrUpdateDonut(e) {
    e.preventDefault();
    const donut = { name, price, imageUrl, description, rating: 5, createTime: new Date().toISOString() };
    console.log(donut);
    if (id != null) {
      updateDonut(id, donut).then((response) => {
        console.log(response.data);
        closeModal(false); // Close the modal after creating the donuts
        navigator('/backstage/backdonuts');
      }).catch(error => {
        console.error(error);
      })
    } else {
      createDonuts(donut).then((response) => {
        console.log(response.data);
        closeModal(false); // Close the modal after creating the donuts
        navigator('/backstage/backdonuts');
      }).catch(error => {
        console.error(error);
      })
    }
  }

  function pageTitle() {
    if (id != null) {
      return <h1 className="modal-title fs-5" >Update Donut</h1>

    } else {
      return <h1 className="modal-title fs-5" >Add Donut</h1>
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
            <button type="button" className="btn btn-primary" onClick={saveOrUpdateDonut}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DonutsModal