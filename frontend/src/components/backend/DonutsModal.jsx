import React, { useEffect, useState } from 'react'
import '../../styles/backend/Modal.css'
import { createDonuts, getSingleDonut, updateDonut } from '../../services/DonutService';
import { useNavigate } from 'react-router-dom';

const DonutsModal = ({ closeModal, id }) => {
  // State variables for managing form input and errors
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(null);
  const [createTime, setCreateTime] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    price: '',
    imageUrl: '',
    description: ''
  })

  // React Router hook for navigation
  const navigator = useNavigate();

  // Effect to fetch data when id changes
  useEffect(() => {
    if (id != null) {
      getSingleDonut(id).then((response) => {
        setName(response.data.name);
        setPrice(response.data.price);
        setImageUrl(response.data.imageUrl);
        setDescription(response.data.description);
        setRating(response.data.rating);
        setCreateTime(response.data.createTime);
      }).catch(error => {
        console.error(error);
      })
    }
  }, [id])

  // Function to handle form submission
  function saveOrUpdateDonut(e) {
    e.preventDefault();
    if (validateForm()) {
      const donut = { name, price, imageUrl, description, rating, createTime };
      console.log(donut);
      if (id != null) {
        // Update donut if id exists
        updateDonut(id, donut).then((response) => {
          closeModal(false); // Close the modal after creating the donuts
          navigator('/backstage/backdonuts');
          window.location.reload(); // Reload the page after navigation
        }).catch(error => {
          console.error(error);
        })
      } else {
        // Create new donut if id is null
        createDonuts(donut).then((response) => {
          closeModal(false); // Close the modal after creating the donuts
          navigator('/backstage/backdonuts');
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
      return <h1 className="modal-title fs-5" >Update Donut</h1>

    } else {
      return <h1 className="modal-title fs-5" >Add Donut</h1>
    }
  }

  // Function to validate form input
  function validateForm() {
    let valid = true;
    const errorsCopy = { ...errors };
    if (name.trim()) {
      errorsCopy.name = '';
    } else {
      errorsCopy.name = 'Donut name is required';
      valid = false;
    }

    if (price.trim()) {
      errorsCopy.price = '';
    } else {
      errorsCopy.price = 'Donut price is required';
      valid = false;
    }

    if (imageUrl.trim()) {
      errorsCopy.imageUrl = '';
    } else {
      errorsCopy.imageUrl = 'Donut imageUrl is required';
      valid = false;
    }

    if (description.trim()) {
      errorsCopy.description = '';
    } else {
      errorsCopy.description = 'Donut description is required';
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
                <label className="col-form-label">Name:</label>
                <input
                  type="text"
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  placeholder="Enter the donut name"
                  name='name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                {errors.name && <div className='invalid-feedback'>{errors.name}</div>}
              </div>
              <div className="mb-3">
                <label className="col-form-label">Price:</label>
                <input
                  type="text"
                  className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                  placeholder="Enter the donut price"
                  name='price'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
                {errors.price && <div className='invalid-feedback'>{errors.price}</div>}
              </div>
              <div className="mb-3">
                <label className="col-form-label">Image Url:</label>
                <input
                  type="text"
                  className={`form-control ${errors.imageUrl ? 'is-invalid' : ''}`}
                  placeholder="Enter the image URL"
                  name='imageUrl'
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                {errors.imageUrl && <div className='invalid-feedback'>{errors.imageUrl}</div>}
              </div>
              <div className="mb-3">
                <label className="col-form-label" >Description:</label>
                <textarea
                  className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  placeholder="Enter the donut description"
                  name='description'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                {errors.description && <div className='invalid-feedback'>{errors.description}</div>}
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