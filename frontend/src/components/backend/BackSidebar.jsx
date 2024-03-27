import React, { useState } from 'react'
import { SidebarData } from './SidebarData'
import '../../styles/backend/Sidebar.css'
import BackHeader from './BackHeader';

function BackSidebar() {
  // const [activeSidebar, setActiveSidebar] = useState(SidebarData[0]); // Initialize active sidebar with the first item

  // const handleSidebarClick = (item) => {
  //   setActiveSidebar(item);
  //   window.location.pathname = item.link; // Redirect to the clicked item's link
  // };


  return (
    <div className='Sidebar'>
      {/* <BackHeader sidebarName={activeSidebar.title} sidebarLink={activeSidebar.link} /> */}
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
