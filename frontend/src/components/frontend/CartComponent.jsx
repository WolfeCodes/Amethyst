import React, { useEffect, useState, useContext } from 'react'
import { checkoutCart, getCartTotal, getUserCart, getCartByUserId } from '../../services/CartService'
import { getSingleDonut } from '../../services/DonutService';
import { getCartItemById, updateCartItemQuantity } from '../../services/CartItemService';
import map from '../../assets/map.png'
import '../../styles/frontend/Cart.css'
import { LoginContext } from '../../contexts/LoginContext';


const CartComponent = () => {

  const [userCart, setUserCart] = useState([]);
  const [total, setTotal] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [donutData, setDonutData] = useState([])
  const [cartId, setCartId] = useState([]);
  const {user, SetUser} = useContext(LoginContext);
  
  //useEffect to set user state if a token is stored
  useEffect(() => {
    if (localStorage.getItem("token")) {
      SetUser(localStorage.getItem("token"));
    }
  });


  // getCartByUserId(user.accessToken).then((response => {
  //   console.log(response);
  // }).catch(error => {
  //   console.error(error);
  // }));

  useEffect(() => {
    getCartByUserId(user).then(response => {
      console.log(response.data);
      setCartId(response.data);
    }).catch(error => {
      console.error(error);
    });
  }, [user])

  useEffect(() => {
    const id = 1; //hardcoded for now until dynamic routing 
    //will need to fetch userId cart get cartId

    //create a cartByJwt endpoint to return cartId
    //getCart().then((response) => {id = response.data})
    


    if (cartId) {
      getUserCart(cartId).then((response) => {
        setUserCart(response.data);
        const uniqueCartItemIds = [...new Set(response.data.cartItemIds)];
        console.log(uniqueCartItemIds);
        Promise.all( 
          uniqueCartItemIds.map((cartItemId) => getCartItemById(cartItemId)) 
        ).then((donutResponses) => {
          setCartItems(donutResponses.map((res) => res.data));
          //Fetch and store donut data for each cart item
          const donutPromises = donutResponses.map((res) => 
          getSingleDonut(res.data.donutId)
          );
          Promise.all(donutPromises).then((donutData) => {
            setDonutData(donutData);
          });
        }).catch(error => {
          console.error(error);
        })
      }).catch(error => {
        console.error(error);
      })
    }
  }, [cartId]) //will need the user id in the array at the end of this function

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  

  //useEffect hook to get the initial cart price
  useEffect(() => {
    const id = 1; //hardcoded for now until dynamic routing
    getCartTotal(id).then((response) => {
      setTotal(response.data);
    }).catch(error => {
      console.error(error);
    })
  })

  
  const increaseQuantity = (index) => {
    const updatedCartItem = [...cartItems];
    updatedCartItem[index].quantity += 1;
    updateCartItemQuantity(updatedCartItem[index].id, updatedCartItem[index].quantity)
    .then(() => {
      const id = 1; //hardcoded for now until dynamic routing
      getCartTotal(id).then((response) => {
        setTotal(response.data);
      }).catch(error => {
        console.error(error);
      });
    }).catch(error => {
      console.error(error);
    });
    setCartItems(updatedCartItem);
  };

  const decreaseQuantity = (index) => {
    const updatedCartItem = [...cartItems];
    if (updatedCartItem[index].quantity > 1) {
      updatedCartItem[index].quantity -= 1;
      updateCartItemQuantity(updatedCartItem[index].id, updatedCartItem[index].quantity)
      .then(() => {
        const id = 1; //hardcoded for now until dynamic routing
        getCartTotal(id).then((response) => {
          setTotal(response.data);
        }).catch(error => {
          console.error(error);
        });
      }).catch(error => {
        console.error(error);
      });
    }
    setCartItems(updatedCartItem);
  };

  const checkout = () => {
    console.log('got clicked');
    const cartId = 1; //hardcoded until user authentication
    checkoutCart(cartId);
    setCartItems([]);
    setTotal([]);
  }

  
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
            {cartItems.map((cartItem, index) => (
              <div key={cartItem.id} className='donut-item'>
                {donutData[index] && (
                  <>
                  <img src={donutData[index].data.imageUrl} alt={donutData[index].data.name} className='donut-image' />
                  <div className='donut-content'>
                    <span className='donut-name'>{donutData[index].data.name}</span>
                    <span className='donut-price'>${donutData[index].data.price}</span>
                  </div>
                  <div className='quantity-container'>
                    <button className='quantity-bt' onClick={() => decreaseQuantity(index)}>-</button>
                    <span className='quantity'>{cartItem.quantity}</span>
                    <button className='quantity-bt' onClick={() => increaseQuantity(index)}>+</button>
                  </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className='footer'>
        <div className='total'>
          <span className='subtotal'>Subtotal:</span>
          <span className='total-price'>${total}</span>
        </div>
        <div>
          <button className='submit-tb' onClick={() => checkout()}>Checkout</button>
        </div>
      </div>
    </div>
  )
}

export default CartComponent