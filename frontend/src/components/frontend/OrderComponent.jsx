import React, { useEffect, useState, useContext } from 'react';
import { listOrders, getOrderPrice, getOrderItems } from '../../services/OrderService';
import { getSingleDonut } from '../../services/DonutService'; // Importing getSingleDonut
import '../../styles/frontend/Order.css'; 
import { LoginContext } from '../../contexts/LoginContext';
import { getCartByUserId } from '../../services/CartService';

const OrderComponent = () => {
  const [orders, setOrders] = useState([]);
  const [userOrderPrice, setUserOrderPrice] = useState({});
  const [donutData, setDonutData] = useState({});
  const [cartId, setCartId] = useState(null);
  const { SetUser } = useContext(LoginContext);

  useEffect(() => {
    console.log("Effect triggered");
    const token = localStorage.getItem("token");
    console.log("Token:", token);
    if (token) {
      SetUser(token);
      getCartByUserId(token)
        .then(response => {
          console.log("Cart response:", response);
          const cartIdFromResponse = response.data;
          console.log("Cart ID:", cartIdFromResponse);
          setCartId(cartIdFromResponse);
          listOrders(cartIdFromResponse)
            .then(response => {
              console.log("Orders response:", response);
              const userOrders = response.data.filter(order => order.userId === cartIdFromResponse);
              console.log("User orders:", userOrders);
              setOrders(userOrders);
              userOrders.forEach(order => {
                getOrderPrice(order.id)
                  .then(priceResponse => {
                    console.log("Price response:", priceResponse);
                    setUserOrderPrice(prevState => ({
                      ...prevState,
                      [order.id]: priceResponse.data
                    }));
                  })
                  .catch(error => {
                    console.error('Error fetching order price:', error);
                  });

                order.orderItemIds.forEach(orderItemId => {
                  getOrderItems(orderItemId) // Fetch order item data based on order item ID
                    .then(itemsResponse => {
                      console.log("Items response for order item ID", orderItemId, ":", itemsResponse);
                      const donutId = itemsResponse.data.donutId;
                      getSingleDonut(donutId)
                        .then(donutResponse => {
                          console.log("Donut response for ID", donutId, ":", donutResponse);
                          setDonutData(prevState => ({
                            ...prevState,
                            [orderItemId]: {
                              donutId: donutId,
                              name: donutResponse.data.name // Assuming name is a property of the donut object
                            }
                          }));
                        })
                        .catch(error => {
                          console.error('Error fetching donut:', error);
                        });
                    })
                    .catch(error => {
                      console.error('Error fetching order items:', error);
                    });
                });
              });
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
      <div className="order-section">
        <div className="order-header">
          <h1 className="order-page-heading">Order Page</h1>
          <div className="image-placeholder">
            <img src="https://donutbank.com/cdn/shop/products/GlazedwithSprinkles.png?v=1695916807" alt="Donut Placeholder" />
          </div>
        </div>
        <div className="user-info">User: {}</div>
      </div>

      <div className="previous-orders">
        <h2 className="previous-orders-heading">Previous Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Order Number</th>
              <th>Donut Names</th>
              <th>Quantity</th>
              <th>Date</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td style={{ width: '40px' }}>{order.id}</td>
                <td>
                  {order.orderItemIds.map((orderItemId, index) => {
                    const donutName = donutData[orderItemId]?.name;
                    console.log('New Donut Name:', donutName);
                    return (
                      <span key={index}>{index > 0 ? ', ' : ''}{donutName}</span>
                    );
                  })}
                </td>
                <td>{order.orderItemIds.length}</td>
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
