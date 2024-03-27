import React, { useEffect, useState } from 'react'
import { getUserCart } from '../../services/CartService'
import { getSingleDonut } from '../../services/DonutService';

const CartComponent = () => {
  
  const [userCart, setUserCart] = useState([]);  
  const [donuts, setDonuts] = useState([]);
  
  //useEffect hook to fetch userCart data, then extracts donutIds, and fetches donut object information from getById mapping
  useEffect(() => {

    const id = 1; //hardcoded for now until dynamic routing
    
    if(id){
        getUserCart(id).then((response) =>{
            setUserCart(response.data);
            const uniqueDonutIds = [...new Set(response.data.donutIds)];
            Promise.all(
                uniqueDonutIds.map((donutId) => getSingleDonut(donutId))
            ).then((donutResponses) =>{
                setDonuts(donutResponses.map((res) => res.data));
            }).catch(error => {
                console.error(error);
            })
        }).catch(error => {
            console.error(error);
        })
    }
}, []) //will need the id in the array at the end of this function

    //reusing backstage table list for the moment
    return (
    <div>
        <div className="table-responsive"> 
        <table className="table">
          <thead className="table-light">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Image</th>
              <th>Description</th>
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
                <td color='#0A58CA'>Edit delete</td>
              </tr>

            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default CartComponent