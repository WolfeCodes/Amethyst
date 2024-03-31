import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/frontend/Header.css'

const Header = () => {

    return (
        <div className='header'>
            <nav className='navbar navbar-expand'>
                <div className='container-fluid'>
                    <a className='navbar-brand' href='/'>
                        <img src="https://donutbank.com/cdn/shop/products/WhiteIcingCakewithSprinkles.png?v=1695916793" alt="Logo" width="50" height="40"></img>
                        Donut Delights
                    </a>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link to="/" className="nav-link active" aria-current="page">Home</Link>
                            <Link to="/menu" className="nav-link">Menu</Link>
                        </div>
                        <div className="navbar-nav ms-auto">
                            <a className="nav-link active" aria-current="page" href="#">My Order</a>
                            <a className="nav-link" href="/cart">Cart</a>
                            <Link to="/backstage" className="nav-link btn btn-outline-primary">BackStage</Link>
                            <button type="button" className="signup-bt">Sign up</button>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;
