import React from 'react';
import { NavLink } from 'react-router-dom';
import '../../styles/frontend/Header.css'

const Header = () => {
    return (
        <div>
            <header>
                <nav className='navbar navbar-expand bg-body-tertiary'>
                    <div className='container-fluid'>
                        <a className='navbar-brand' href='/'>
                            <img src="https://donutbank.com/cdn/shop/products/WhiteIcingCakewithSprinkles.png?v=1695916793" alt="Logo" width="50" height="40"></img>
                            Donut Delights</a>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <NavLink to="/" className="nav-link active" aria-current="page">Home</NavLink>
                                <NavLink to="/menu" className="nav-link">Menu</NavLink>
                            </div>
                            <div className="navbar-nav ms-auto">
                                <a className="nav-link active" aria-current="page" href="#">My Order</a>
                                <a className="nav-link" href="#">Cart</a>
                                <NavLink to="/backstage/home" className="nav-link btn btn-outline-primary">BackStage</NavLink>
                                <button type="button" className="btn btn-success">Sign up</button>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default Header;
