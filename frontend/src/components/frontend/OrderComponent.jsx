import React, { useEffect, useState } from 'react';
import { listOrders, getOrderPrice, getOrderItems } from '../../services/OrderService';
import { getSingleUser } from '../../services/UserService';
import { getSingleDonut } from '../../services/DonutService';
import '../../styles/frontend/Order.css'; // Import CSS file

const OrderComponent = () => {
  const [orders, setOrders] = useState([]);
  const [userOrderPrice, setUserOrderPrice] = useState({});
  const [donutData, setDonutData] = useState({});
  const [userIds, setUserIds] = useState([]);

  useEffect(() => {
    listOrders()
      .then(response => {
        const unfilteredOrders = response.data;
        const userOrders = [];

        for (let i = 0; i < unfilteredOrders.length; i++) {
          if (unfilteredOrders[i].userId === 1) {
            userOrders.push(unfilteredOrders[i]);
            // Fetch the order price
            getOrderPrice(unfilteredOrders[i].id)
              .then(priceResponse => {
                setUserOrderPrice(prevState => ({
                  ...prevState,
                  [unfilteredOrders[i].id]: priceResponse.data
                }));
              })
              .catch(error => {
                console.error('Error fetching order price:', error);
              });

            // Fetch order items
            getOrderItems(unfilteredOrders[i].id)
              .then(itemsResponse => {
                console.log('Order Items data:', itemsResponse.data); // Log donutData
                setDonutData(prevState => ({
                  ...prevState,
                  [unfilteredOrders[i].id]: itemsResponse.data
                }));
              })
              .catch(error => {
                console.error('Error fetching order items:', error);
              });
          }
        }
        setOrders(userOrders);

        // Extract user IDs from userOrders and store in userIds state
        const extractedUserIds = userOrders.map(order => order.id);
        setUserIds(extractedUserIds);

        console.log('User Orders:', userOrders);
        console.log('User IDs:', extractedUserIds);
      })
      .catch(error => {
        console.error('Error fetching orders:', error);
      });
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
