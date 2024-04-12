import { React, useEffect, useState } from 'react'
import { listOrders } from '../../services/OrderService';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  // useEffect hook to fetch the list of donuts when the component mounts
  useEffect(() => {
    listOrders()
      .then((response) => {
        setDonuts(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="backcontainer">
      <div className="row">
        <div className="col-md-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search order"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value.toString())}
            />
            <button className="btn btn-outline-primary" type="button" id="button-addon2" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table">
          <thead className="table-light">
            <tr>
              <th>Id</th>
              <th>OrderId</th>
              <th>Order</th>
              <th>Description</th>
              <th>Price</th>
              <th>rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {donuts.map((donut, index) => (
              <tr key={index}>
                <td style={{ width: '40px' }}>{index + 1}</td>
                <td style={{ width: '250px' }}>{donut.name}</td>
                <td style={{ width: '40px' }}><img src={donut.imageUrl} className='table-img' /></td>
                <td style={{ width: '550px' }}>{donut.description}</td>
                <td>{donut.price}</td>
                <td style={{ width: '40px' }}>{donut.rating}</td>
                <td >
                  <button className="btn btn-link" onClick={() => { updateDonut(donut.id) }}>
                    Detail
                  </button>
                  {showModal && <DonutsModal closeModal={() => setShowModal(false)} id={selectedDonutId} />}
                </td>
              </tr>

            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default OrderManagement
