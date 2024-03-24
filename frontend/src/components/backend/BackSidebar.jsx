import React from 'react'
import { SidebarData } from './SidebarData'
import '../../styles/backend/Sidebar.css'

function BackSidebar() {
  return (
    <div className='Sidebar'>
      <ul className='SidebarList'>
        {SidebarData.map((val, key) => {
          return (
            <li key={key} className="row" onClick={() => { window.location.pathname = val.link }}>
              <div>{val.icon}</div> <div class="title">{val.title}</div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default BackSidebar
