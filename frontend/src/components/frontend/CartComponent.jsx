import React, { useEffect, useState } from 'react'
import { getUserCart } from '../../services/CartService'
import { getSingleDonut } from '../../services/DonutService';
import { getCartItemById } from '../../services/CartItemService';
import map from '../../assets/map.png'
import '../../styles/frontend/Cart.css'
import { DonutLarge } from '@mui/icons-material';


const CartComponent = () => {

  const [userCart, setUserCart] = useState([]);
  const [donuts, setDonuts] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [donutData, setDonutData] = useState([])
  

  //useEffect hook to fetch userCart data, then extracts donutIds, and fetches donut object information from getById mapping
  useEffect(() => {
    const id = 1; //hardcoded for now until dynamic routing
    if (id) {
      getUserCart(id).then((response) => {
        setUserCart(response.data);
        const uniqueCartItemIds = [...new Set(response.data.cartItemIds)];
        console.log(uniqueCartItemIds);
        Promise.all( 
          uniqueCartItemIds.map((cartItemId) => getCartItemById(cartItemId)) 
        ).then((donutResponses) => {
          setCartItems(donutResponses.map((res) => res.data));
        }).catch(error => {
          console.error(error);
        })
      }).catch(error => {
        console.error(error);
      })
    }
  }, []) //will need the id in the array at the end of this function

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);


  
  const increaseQuantity = (index) => {
    const updatedDonuts = [...donuts];
    updatedDonuts[index].quantity += 1;
    setDonuts(updatedDonuts);
  };

  const decreaseQuantity = (index) => {
    const updatedDonuts = [...donuts];
    if (updatedDonuts[index].quantity > 1) {
      updatedDonuts[index].quantity -= 1;
    }
    setDonuts(updatedDonuts);
  };

  async function getDonutData (donutId) {
    let donut;
    try{
      donut = await getSingleDonut(donutId);
      setDonutData(donut);
    } catch (e){
      console.log(e);
    }
  }

  //reusing backstage table list for the moment
  return (
    <div>
      <div className='cart-container'>
        <div className='pickup-container'>
          <div className='pickup-content'>
            <div>Please notice: you need pick up at</div>
            <div className='address'>
              <a href="https://www.google.com/maps/search/?api=1&query=2709+Sutton+Boulevard" target="_blank" rel="noopener noreferrer">
                2709 Sutton Boulevard
              </a>
            </div>
          </div>
          <div className='map-container'>
            <a href="https://www.google.com/maps/search/?api=1&query=2709+Sutton+Boulevard" target="_blank" rel="noopener noreferrer">
              <img src={map} alt="map" className='map-picture'></img>
            </a>
          </div>
        </div>
        <div className='shopping-cart'>
          <div className="cart-title">
            <h2>Shopping Cart</h2>
          </div>

          <div className='items'>
            {cartItems.map((cartItem) => (
              <div key={cartItem.id} className='donut-item'>
                {console.log(getSingleDonut(cartItem.donutId))}
                <img src={getSingleDonut(cartItem.donutId).imageUrl} alt={getSingleDonut(cartItem.donutId).name} className='donut-image' />
                <div className='donut-content'>
                  <span className='donut-name'>{getSingleDonut(cartItem.donutId).name}</span>
                  <span className='donut-price'>${getSingleDonut(cartItem.donutId).price}</span>
                </div>
                <div className='quantity-container'>
                  <button className='quantity-bt' onClick={() => decreaseQuantity(index)}>-</button>
                  <span className='quantity'>2</span>
                  <button className='quantity-bt' onClick={() => increaseQuantity(index)}>+</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className='footer'>
        <div className='total'>
          <span className='subtotal'>Subtotal:</span>
          <span className='total-price'>$23.00</span>
        </div>
        <div>
          <button className='submit-tb'>Checkout</button>
        </div>
      </div>
    </div>
  )
}

export default CartComponent