import React from 'react'
import { SidebarData } from './SidebarData'
import { Link } from 'react-router-dom';

import '../../styles/backend/Sidebar.css'

function BackSidebar() {
  return (
    <div className='Sidebar'>
      <div className="logo-wrapper">
        <Link to="/backstage/backhome" className='navbar-brand'>
          <img src="https://donutbank.com/cdn/shop/products/WhiteIcingCakewithSprinkles.png?v=1695916793" alt="Logo" />
        </Link>
        <Link to="/backstage/backhome" className='navbar-brand'>Donut Delights</Link>
      </div>
      <div>
        <ul className='SidebarList'>
          {SidebarData.map((val, key) => {
            return (
              <li key={key} className="row" onClick={() => window.location.pathname = val.link}>
                <div>{val.icon}</div>
                <div className="title">{val.title}</div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>


  );
}




export default BackSidebar
