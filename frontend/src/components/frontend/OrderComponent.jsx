// OrderComponent.jsx

import React from 'react';
import '../../styles/frontend/Order.css';

const OrderComponent = () => {
  const orders = []; // Placeholder for orders

  return (
    <div className="order-container">
      <h1 className="order-page-heading">Order Page</h1>
      <div className="user-info">User: {/* Placeholder for user info */}</div>
      <div className="previous-orders">
        <h2>Previous Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Donut</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {/* Map over orders to display previous orders */}
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order.donut}</td>
                <td>{order.quantity}</td>
                <td>{order.date}</td>
                <td>{order.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderComponent;
