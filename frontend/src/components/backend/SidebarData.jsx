import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CookieIcon from '@mui/icons-material/Cookie';

export const SidebarData = [
  {
    title: "Home",
    icon: <HomeIcon />,
    link: "/backstage/home"
  },
  {
    title: "DonutHub",
    icon: <CookieIcon />,
    link: "/backstage/donuts"
  },
  {
    title: "OrderManagement",
    icon: <ListAltIcon />,
    link: "/ordermanagement"
  },
  {
    title: "UserManagement",
    icon: <AccountCircleIcon />,
    link: "/usermanagement"
  }
]