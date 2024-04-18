import React, { useEffect, useState, useContext } from 'react';
import { listOrders, getOrderPrice, getOrderItems } from '../../services/OrderService';
import '../../styles/frontend/Order.css'; 
import { LoginContext } from '../../contexts/LoginContext';
import { getCartByUserId } from '../../services/CartService';

const OrderComponent = () => {
  const [orders, setOrders] = useState([]);
  const [userOrderPrice, setUserOrderPrice] = useState({});
  const [donutData, setDonutData] = useState({});
  const [cartId, setCartId] = useState({});
  const { SetUser } = useContext(LoginContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (token) {
      SetUser(token);
      getCartByUserId(token)
        .then(response => {
          console.log('getCartByUserId', response);
          setCartId(response.data);
          console.log('Cart ID:', cartId);
          
          listOrders(response.data.userId)
            .then(response => {
              console.log('All Orders:', response.data);
              const userOrders = response.data.filter(order => order.userId === cartId);
              console.log('Filtered Orders:', userOrders);

              userOrders.forEach(order => {
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
        })
        .catch(error => {
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
              <th>Order Number</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
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
