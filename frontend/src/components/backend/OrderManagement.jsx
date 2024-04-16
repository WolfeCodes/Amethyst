import { React, useEffect, useState } from 'react'
import { listOrders, getOrderPrice, getOrderItems } from '../../services/OrderService';
import { getSingleUser } from '../../services/UserService';
import { getSingleDonut } from '../../services/DonutService'
import OrderDetailModal from './OrderDetailModal';

import '../../styles/backend/BackDonuts.css';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null); // State to store the selected donut id


  // Fetch all orders when the component mounts
  useEffect(() => {
    listAllOrders();
  }, []);

  // Function to fetch and process all orders
  const listAllOrders = () => {
    // Fetch all orders
    listOrders()
      .then(async (response) => {
        const ordersWithUserAndPrice = response.data.map(async (order) => {
          // Fetch user details for the order
          try {
            const userResponse = await getSingleUser(order.userId);
            const userData = userResponse.data;
            const { username, email } = userData;

            // Fetch the order price
            const priceResponse = await getOrderPrice(order.id);
            const orderPrice = parseFloat(priceResponse.data).toFixed(2);

            // Fetch details for each order item
            const donutDetailsPromises = order.orderItemIds.map(async (orderItemId) => {
              try {
                const itemResponse = await getOrderItems(orderItemId);
                const { donutId, quantity } = itemResponse.data;

                if (donutId) {
                  const donutResponse = await getSingleDonut(donutId);
                  const donutData = donutResponse.data;
                  const { name, imageUrl, price } = donutData;
                  console.log(donutData);
                  return { name, imageUrl, price, quantity };
                } else {
                  console.error('Error: itemId is undefined');
                  return null;
                }
              } catch (error) {
                console.error('Error fetching item details:', error);
                return null;
              }
            });

            // Wait for all item details promises to resolve
            const donutDetails = await Promise.all(donutDetailsPromises);

            // Return the order with user, price, and item details
            return { ...order, username, email, orderPrice, donutDetails };
          } catch (error) {
            console.error('Error fetching user or price:', error);
            return { ...order, username: 'N/A', email: 'N/A', orderPrice: 'N/A' };
          }
        });

        // Wait for all orders to be processed
        const updatedOrders = await Promise.all(ordersWithUserAndPrice);
        setOrders(updatedOrders);
      })
      .catch((error) => {
        console.error(error);
      });
  };


  // Open the modal to show order details
  function OrderDetails(id) {
    setSelectedOrderId(id); // Set the selected order id
    console.log("selected orderId " + selectedOrderId);
    setShowModal(true); // Open the modal
  }


  // // Function to list search orders
  // function handleSearch() {
  //   if (searchTerm !== '') { // Ensure searchTerm is not empty
  //     getUsersByname(searchTerm)
  //       .then((response) => {
  //         console.log(searchTerm);
  //         console.log(response.data);
  //         setUsers(response.data);
  //       })
  //       .catch((error) => {
  //         console.error(error);
  //       });
  //   } else {
  //     listAllUsers(); // If searchTerm is empty, list all users
  //   }
  // }


  return (
    <div className="backcontainer">
      <div className="row">
        <div className="col-md-6">
          <div className="input-group">
            <input
              type="text"
              className="form-control"
              placeholder="Search username"
              aria-label="Recipient's username"
              aria-describedby="button-addon2"
            // value={searchTerm}
            // onChange={(e) => setSearchTerm(e.target.value.toString())}
            />
            <button className="btn btn-outline-primary" type="button" id="button-addon2" >
              Search
            </button>
          </div>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table">
          <thead className="table-light">
            <tr>
              <th>OrderId</th>
              <th>OrderTime</th>
              <th>Total Price</th>
              <th>User Name</th>
              <th>User Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td style={{ width: '40px' }}>{order.id}</td>
                <td style={{ width: '250px' }}>{new Date(order.createTime).toLocaleString()}</td>
                <td style={{ width: '150px' }}>{order.orderPrice}</td>
                <td style={{ width: '250px' }}>{order.username}</td>
                <td>{order.email}</td>
                <td >
                  <button className="btn btn-link" onClick={() => { OrderDetails(order.id) }}>
                    Detail
                  </button>
                  {showModal && <OrderDetailModal closeModal={() => setShowModal(false)} order={orders.find(order => order.id === selectedOrderId)} />}
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
