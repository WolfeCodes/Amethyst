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
  const [cartId, setCartId] = useState(null);
  const {user, SetUser} = useContext(LoginContext);
  
  //useEffect to set user state if a token is stored
  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     SetUser(localStorage.getItem("token"));
  //   }
  // });

  // useEffect(() => {
  //   getCartByUserId(user).then(response => {
  //     console.log(response.data);
  //     setCartId(response.data);
  //   }).catch(error => {
  //     console.error(error);
  //   });
  // }, [user])

  //Sets user to its JWT and sets cartId based on logged in user
  useEffect(() => {
    //Gets the token from localStorage
    const token = localStorage.getItem("token");
    console.log(token);
    //if token exist SetUser and then get cart by userId
    if (token) {
      //passes the token to user. 
      SetUser(token);
      //this is an API call to localhost8080/api/cart/cartId
      getCartByUserId(token).then(response => {
        //sets the cartId
        setCartId(response.data);
        console.log(cartId);
      }).catch(error => {
        console.error(error);
      });
    } //follow up with a redirect to Login/SignUp if user token does not exist
  }, []);

  useEffect(() => {
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
  }, [cartId]) 

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  

  //useEffect hook to get the initial cart price
  useEffect(() => {
    const id = 1; //hardcoded for now until dynamic routing
    getCartTotal(cartId).then((response) => {
      const formatTotal = new Intl.NumberFormat('en-US', { style: 'decimal', maximumFractionDigits: 2 }).format(response.data);
      setTotal(formatTotal);
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