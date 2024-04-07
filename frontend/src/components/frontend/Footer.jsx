
import React from "react";
import twitter from '../../assets/twitter.jpg';
import instagram from '../../assets/instagram.jpg';
import facebook from '../../assets/facebook.jpg';

const Footer = () => {

  return (
    <div>
      <footer className='d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top'>
        <div className='col-md-4 d-flex align-items-center'>
          <span className='mb-3 mb-md-0 text-body-secondary' style={{ marginLeft: '80px' }}>@All rights reserved 2024 by Amethyst</span>
        </div>
        <ul className='nav col-md-4 justify-content-end list-unstyled d-flex' style={{ marginRight: '100px' }}>
          <li className='ms-3'>
            <a className='text-body-secondary' href='#'>
              <img src={twitter} alt='Twitter' width='24' height='24' />
            </a>
          </li>
          <li className='ms-3'>
            <a className='text-body-secondary' href='#'>
              <img src={instagram} alt='instagram' width='24' height='24' />
            </a>
          </li>
          <li className='ms-3'>
            <a className='text-body-secondary' href='#'>
              <img src={facebook} alt='facebook' width='24' height='24' />
            </a>
          </li>
        </ul>
      </footer>
    </div>
  )
}

export default Footer
