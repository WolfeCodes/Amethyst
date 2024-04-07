import React, { useEffect, useState } from 'react'
import { listDonuts } from '../../services/DonutService';
import '../../styles/frontend/ListDonut.css'
import { addDonutToCart } from '../../services/CartService';


// fetches a list of donuts from a service and displays them as cards
const ListDonut = ({ numberOfDonuts }) => {

  const [donuts, setDonuts] = useState([]);
  // useEffect hook to fetch the list of donuts when the component mounts
  useEffect(() => {
    listDonuts().then((response) => {
      setDonuts(response.data.slice(0, numberOfDonuts));
    }).catch(error => {
      console.error(error);
    })
  }, [numberOfDonuts])

  const handleAddToCart = (donutId) => {
    const cartId = 1; //need static user until authentication is set up
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
            <div className="card h-100">
              <img src={donut.imageUrl} className="card-img-top" alt="..."></img>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{donut.name}</h5>
                <p className="card-text flex-fill description">{donut.description}</p>
                <p>Price: ${donut.price}</p>
                <button className="btn btn-outline-primary" onClick={() => handleAddToCart(donut.id)}>Add to cart</button>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>

  )
}

export default ListDonut;