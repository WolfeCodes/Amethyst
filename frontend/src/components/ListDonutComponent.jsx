import React, {useEffect, useState} from 'react'
import { listDonuts } from '../services/DonutService';


const ListDonutComponent = () => {
  
  const [donuts, setDonuts] = useState([]);

  useEffect(() => {
    listDonuts().then((response) => {
      setDonuts(response.data);
    }).catch(error => {
      console.error(error);
    })

  }, [])
  
  return (
    <div className='container'>

  <div className='row row-cols-1 row-cols-md-3 g-4'>
    {donuts.map(donut =>
      <div className='col' key={donut.id}>
        <div className="card h-100">
          <img src={donut.imageUrl} className="card-img-top" alt="..."></img>
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">{donut.name}</h5>
            <p className="card-text flex-fill">{donut.description}</p>
            <p>Price: ${donut.price}</p>
            <a href="#" className="btn btn-primary mt-auto">Add to cart</a>
          </div>
        </div>
      </div>
    )}
  </div>

</div>

  )
}

export default ListDonutComponent