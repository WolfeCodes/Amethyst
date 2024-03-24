import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/frontend/Header';
import Home from './components/frontend/Home';
import ListDonut from './components/frontend/ListDonut';
import BackDonuts from './components/backend/BackDonuts';
import BackSidebar from './components/backend/BackSidebar';
import BackHome from './components/backend/BackHome';

function FrontendApp() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<ListDonut />} />
      </Routes>
    </>
  );
}

function BackendApp() {
  return (
    <>
      <BackSidebar />
      <Routes>
        <Route path="/backstage/home" element={<BackHome />} />
        <Route path="/backstage/donuts" element={<BackDonuts />} />
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
