import React, { useEffect, useState } from 'react'
import { getUserCart } from '../../services/CartService'

const CartComponent = () => {
  
  const [userCart, setUserCart] = useState([]);  
  const [donuts, setDonuts] = useState([]);
    
  useEffect(() => {

    const id = 1;
    
    if(id){
        getUserCart(id).then((response) =>{
            setUserCart(response.data);
        }).catch(error => {
            console.error(error);
        })
    }
}, [])

  
  
  
    return (
    <div>

    </div>
  )
}

export default CartComponent