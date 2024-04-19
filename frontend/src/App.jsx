import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from 'react';
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
import { LoginContext } from './contexts/LoginContext';


function FrontendApp() {
  const location = useLocation(); // Get current location using useLocation hook
  // Check if the current location is either Home or ListDonut
  const isHomePage = location.pathname === '/';
  const isListDonutPage = location.pathname === '/menu';
  const [user, SetUser] = useState(null);

  return (
    <LoginContext.Provider value={{ user, SetUser }}>
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
    </LoginContext.Provider>
  );
}

function BackendApp() {
  const [user, SetUser] = useState(null);
  return (
    <LoginContext.Provider value={{ user, SetUser }}>
      <>
        <BackSidebar />
        <BackHeader />
        <Routes>
          <Route path="/backhome" element={<BackHome companyName="Home" />} />
          <Route path="/backdonuts" element={<BackDonuts companyName="DonutHub" />} />
          <Route path="/ordermanagement" element={<OrderManagement companyName="OrderManagement" />} />
          <Route path="/usermanagement" element={<UserManagement companyName="UserManagement" />} />
          <Route path='/user' element={<UserComponent />} />
        </Routes>
      </>
    </LoginContext.Provider>
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
