import React, { useEffect, useState, useContext } from 'react';
import { listOrders, getOrderPrice, getOrderItems, getOrderByUserId } from '../../services/OrderService';
import { getSingleUser } from '../../services/UserService';
import { getSingleDonut } from '../../services/DonutService';
import '../../styles/frontend/Order.css'; // Import CSS file
import { LoginContext } from '../../contexts/LoginContext';


const OrderComponent = () => {
  const [orders, setOrders] = useState([]);
  const [userOrderPrice, setUserOrderPrice] = useState({});
  const [donutData, setDonutData] = useState({});
  const [userIds, setUserIds] = useState([]);
  const [orderId, setOrderId] = useState(null);
  const { user, SetUser } = useContext(LoginContext);

  useEffect(() => {
    //Gets the token from localStorage
    const token = localStorage.getItem("token");
    console.log(token);
    //if token exist SetUser and then get order by userId
    if (token) {
      //passes the token to user. 
      SetUser(token);
      //this is an API call to localhost8080/api/order/orderId
      getOrderByUserId(token).then(response => {
        console.log('getOrderByUserId', getOrderByUserId)
        //sets the orderId
        setOrderId(response.data);
        console.log('Order ID:', orderId);
        
        // Now, fetch orders related to the user directly
        listOrders(response.data)
          .then(response => {
            // Filter orders for the logged-in user
            const userOrders = response.data;

            // Fetch order details for each order
            userOrders.forEach(order => {
              // Fetch the order price
              getOrderPrice(order.id)
                .then(priceResponse => {
                  setUserOrderPrice(prevState => ({
                    ...prevState,
                    [order.id]: priceResponse.data
                  }));
                })
                .catch(error => {
                  console.error('Error fetching order price:', error);
                });

              // Fetch order items
              getOrderItems(order.id)
                .then(itemsResponse => {
                  setDonutData(prevState => ({
                    ...prevState,
                    [order.id]: itemsResponse.data
                  }));
                })
                .catch(error => {
                  console.error('Error fetching order items:', error);
                });
            });

            setOrders(userOrders);
            console.log('User Orders:', userOrders);
          })
          .catch(error => {
            console.error('Error fetching orders:', error);
          });
      }).catch(error => {
        console.error(error);
      });
    } //follow up with a redirect to Login/SignUp if user token does not exist
  }, []);

  return (
    <div className="order-container">
      {/* Order Section */}
      <div className="order-section">
        <div className="order-header">
          <h1 className="order-page-heading">Order Page</h1>
          {/* Image Placeholder */}
          <div className="image-placeholder">
            <img src="https://donutbank.com/cdn/shop/products/GlazedwithSprinkles.png?v=1695916807" alt="Donut Placeholder" />
          </div>
        </div>
        {/* User Information */}
        <div className="user-info">User: {}</div>
      </div>

      {/* Previous Orders Section */}
      <div className="previous-orders">
        <h2 className="previous-orders-heading">Previous Orders</h2>
        {/* Table to Display Previous Orders */}
        <table>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {/* Map over orders to display previous orders */}
            {orders.map((order, index) => (
              <tr key={index}>
                <td style={{ width: '40px' }}>{order.id}</td>
                <td>{donutData[order.id]?.quantity || '-'}</td>
                <td>{new Date(order.createTime).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                <td>${userOrderPrice[order.id]?.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderComponent;
