import React, { useEffect, useState, useRef } from 'react';
import { listDonuts } from '../../services/DonutService';
import { addDonutToCart } from '../../services/CartService';
import '../../styles/frontend/ListDonut.css';

const ListDonut = ({ numberOfDonuts }) => {
  const [donuts, setDonuts] = useState([]);
  const tallestTextRef = useRef(null);

  useEffect(() => {
    listDonuts()
      .then(response => {
        setDonuts(response.data.slice(0, numberOfDonuts));
      })
      .catch(error => {
        console.error(error);
      });
  }, [numberOfDonuts]);

  const handleAddToCart = (donutId) => {
    const cartId = 1; // Need static user until authentication is set up
    addDonutToCart(cartId, donutId)
      .then(() => {
        console.log('Donut added to cart successfully!');
      })
      .catch(error => {
        console.error('Error adding donut to cart:', error);
      });
  };

  return (
    <div className='container'>
      <div className='row row-cols-1 row-cols-md-3 g-4'>
        {donuts.map(donut =>
          <div className='col' key={donut.id}>
            <div className='card h-100'>
              <img src={donut.imageUrl} className='card-img-top' alt='Donut'></img>
              <div className='card-body'>
                <h5 className='card-title'>{donut.name}</h5>
                <p className='card-text' ref={tallestTextRef}>{donut.description}</p>
                <p className='price'>Price: ${donut.price.toFixed(2)}</p>
                <button className='btn btn-outline-primary btn-add-to-cart' onClick={() => handleAddToCart(donut.id)}>Add to Cart</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListDonut;
