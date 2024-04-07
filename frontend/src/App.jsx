import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/frontend/Header';
import Home from './components/frontend/Home';
import ListDonut from './components/frontend/ListDonut';
import BackDonuts from './components/backend/BackDonuts';
import BackSidebar from './components/backend/BackSidebar';
import BackHome from './components/backend/BackHome';
import BackHeader from './components/backend/BackHeader';
import UserManagement from './components/backend/UserManagement';
import CartComponent from './components/frontend/CartComponent';
import OrderComponent from './components/frontend/OrderComponent';
import UserComponent from './components/frontend/UserComponent';
import Footer from './components/frontend/Footer';
import Contact from './components/frontend/Contact';
import OrderManagement from './components/backend/OrderManagement';


function FrontendApp() {
  const location = useLocation(); // Get current location using useLocation hook
  // Check if the current location is either Home or ListDonut
  const isHomePage = location.pathname === '/';
  const isListDonutPage = location.pathname === '/menu';

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<ListDonut />} />
        <Route path='/cart' element={<CartComponent />} />
        <Route path='/order' element={<OrderComponent />} />
        <Route path='/user' element={<UserComponent />} />
      </Routes>
      {isHomePage && <Contact />}
      {/* Render Footer only on Home and ListDonut pages */}
      {(isHomePage || isListDonutPage) && <Footer />}
    </>
  );
}

function BackendApp() {
  return (
    <>
      <BackSidebar />
      <BackHeader />
      <Routes>
        <Route path="/backhome" element={<BackHome />} />
        <Route path="/backdonuts" element={<BackDonuts />} />
        <Route path="/ordermanagement" element={<OrderManagement />} />
        <Route path="/usermanagement" element={<UserManagement />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          {/* Render FrontendApp for all routes except /backstage/* */}
          <Route path="/*" element={<FrontendApp />} />
          {/* Render BackendApp for /backstage/* routes */}
          <Route path="/backstage/*" element={<BackendApp />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
