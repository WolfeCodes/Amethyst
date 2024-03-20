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

      <h2 className='text-center'>List of Donuts</h2>
      <table className='table table-striped table-bordered'>
        <thread>
          <tr>
            <th>Donut Id</th>
            <th>Donut Name</th>
            <th>Donut Price</th>
          </tr>
        </thread>
        <tbody>
          {
            donuts.map(donut => 
            <tr key={donut.id}>
              <td>{donut.id}</td>
              <td>{donut.name}</td>
              <td>{donut.price}</td>
            </tr>)
          }
        </tbody>
      </table>
    </div>
  )
}

export default ListDonutComponent