import React from 'react';
import '../../styles/frontend/Order.css';

const OrderComponent = () => {
  const orders = []; // Placeholder for orders

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
        <div className="user-info">User: {/* Placeholder for user info */}</div>
      </div>

      {/* Previous Orders Section */}
      <div className="previous-orders">
        <h2 className="previous-orders-heading">Previous Orders</h2>
        {/* Table to Display Previous Orders */}
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
