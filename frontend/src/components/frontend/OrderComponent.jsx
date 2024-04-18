import React, { useEffect, useState, useContext } from 'react';
import { listOrders, getOrderPrice, getOrderItems } from '../../services/OrderService';
import '../../styles/frontend/Order.css'; 
import { LoginContext } from '../../contexts/LoginContext';
import { getCartByUserId } from '../../services/CartService';

const OrderComponent = () => {
  // State variables to store orders, order prices, order items, and cart ID
  const [orders, setOrders] = useState([]);
  const [userOrderPrice, setUserOrderPrice] = useState({});
  const [donutData, setDonutData] = useState({});
  const [cartId, setCartId] = useState(null); // Initialize cartId as null
  const { SetUser } = useContext(LoginContext); // Access the user context

  useEffect(() => {
    // Fetch token from local storage
    const token = localStorage.getItem("token");
    console.log("Token:", token); // Log token

    // Check if token exists
    if (token) {
      // Set the user using the token
      SetUser(token);

      // Fetch cart details using the token
      getCartByUserId(token)
        .then(response => {
          // Extract cart ID from the response
          const cartIdFromResponse = response.data;
          // Set the cartId state
          setCartId(cartIdFromResponse);
          console.log('Cart ID:', cartIdFromResponse); // Log cart ID

          // Fetch all orders associated with the cart ID
          listOrders(cartIdFromResponse)
            .then(response => {
              // Log the response from listOrders
              console.log('Response from listOrders:', response);

              // Log all orders for debugging
              console.log('All Orders:', response.data);

              // Iterate over each order
              response.data.forEach((order, index) => {
                console.log(`Order ${index + 1}:`, order);
              });

              // Filter orders based on the cart ID
              const userOrders = response.data.filter(order => order.userId === cartIdFromResponse);
              // Log filtered orders for debugging
              console.log('Filtered Orders:', userOrders);

              // Iterate over each order
              userOrders.forEach(order => {
                // Fetch order price for each order
                getOrderPrice(order.id)
                  .then(priceResponse => {
                    // Update userOrderPrice state with the order price
                    setUserOrderPrice(prevState => ({
                      ...prevState,
                      [order.id]: priceResponse.data
                    }));
                  })
                  .catch(error => {
                    // Log error if fetching order price fails
                    console.error('Error fetching order price:', error);
                  });

                // Fetch order items for each order
                getOrderItems(order.id)
                  .then(itemsResponse => {
                    // Log order items for debugging
                    console.log('Order Items:', itemsResponse.data);
                    // Update donutData state with the order items
                    setDonutData(prevState => ({
                      ...prevState,
                      [order.id]: itemsResponse.data
                    }));
                  })
                  .catch(error => {
                    // Log error if fetching order items fails
                    console.error('Error fetching order items:', error);
                  });
              });

              // Set orders state with filtered orders
              setOrders(userOrders);

              // Log user orders for debugging
              console.log('User Orders:', userOrders);
            })
            .catch(error => {
              // Log error if fetching orders fails
              console.error('Error fetching orders:', error);
            });
        })
        .catch(error => {
          // Log error if fetching cart details fails
          console.error(error);
        });
    }
  }, []);

  return (
    <div className="order-container">
      {/* Order Section */}
      <div className="order-section">
        <div className="order-header">
          <h1 className="order-page-heading">Order Page</h1>
          <div className="image-placeholder">
            {/* Placeholder image for orders */}
            <img src="https://donutbank.com/cdn/shop/products/GlazedwithSprinkles.png?v=1695916807" alt="Donut Placeholder" />
          </div>
        </div>
        <div className="user-info">User: {}</div>
      </div>

      {/* Previous Orders Section */}
      <div className="previous-orders">
        <h2 className="previous-orders-heading">Previous Orders</h2>
        <table>
          <thead>
            <tr>
              {/* Table headers */}
              <th>Order Number</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {/* Loop over orders and display in table */}
            {orders.map((order, index) => (
              <tr key={index}>
                {/* Display order details */}
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
