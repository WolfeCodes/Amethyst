import React from 'react'
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CookieIcon from '@mui/icons-material/Cookie';

export const SidebarData = [
  {
    title: "Home",
    icon: <HomeIcon />,
    link: "/backstage/backhome"
  },
  {
    title: "DonutHub",
    icon: <CookieIcon />,
    link: "/backstage/backdonuts"
  },
  {
    title: "OrderManagement",
    icon: <ListAltIcon />,
    link: "/backstage/ordermanagement"
  },
  {
    title: "UserManagement",
    icon: <AccountCircleIcon />,
    link: "/backstage/usermanagement"
  }
]