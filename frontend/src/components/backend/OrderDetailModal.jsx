import React from 'react'
import '../../styles/backend/Modal.css'

const OrderDetailModal = ({ closeModal, order }) => {

  return (
    <div className="modal-container">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" >Order Detail</h1>
            <button
              type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => closeModal(false)}  >
            </button>
          </div>
          <div>
            <div>
              <div className='item-title-order'>
                <h3>Order information</h3>
              </div>
              <div className='row-item'>
                <div className="col-6-title">Order Id:</div>
                <div className="col-6-content">{order.id}</div>
              </div>
              <div className='row-item'>
                <div className="col-6-title">Order Time:</div>
                <div className="col-6-content">{new Date(order.createTime).toLocaleString()}</div>
              </div>
              <div className='row-item'>
                <div className="col-6-title">User Name:</div>
                <div className="col-6-content">{order.username}</div>
              </div>
              <div className='row-item'>
                <div className="col-6-title">User Email:</div>
                <div className="col-6-content">{order.email}</div>
              </div>
              <div className='item-title-detail'>
                <h3>Item details</h3>
              </div>
              <div className='order-table'>
                <table className="table">
                  <thead className="table-light">
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.donutDetails.map((donut, index) => (
                      <tr key={index}>
                        <td style={{ width: '80px' }}>
                          <img src={donut.imageUrl} alt="Donut" className='item-image' />
                        </td>
                        <td style={{ width: '250px' }}>{donut.name}</td>
                        <td style={{ width: '100px' }}>${donut.price.toFixed(2)}</td>
                        <td style={{ width: '100px' }}>{donut.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={() => closeModal(false)}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrderDetailModal
