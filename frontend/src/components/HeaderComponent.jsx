import React from 'react';
import '../styles/HeaderComponent.css'

const HeaderComponent = () => {
    return (
        <div>
            <header>
                <nav className='navbar navbar-expand bg-body-tertiary'>
                    <div className='container-fluid'>
                        <a className='navbar-brand' href='/'>
                            <img src="https://donutbank.com/cdn/shop/products/WhiteIcingCakewithSprinkles.png?v=1695916793" alt="Logo" width="50" height="40"></img>
                            Donut Delights</a>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                            <div className="navbar-nav">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                                <a className="nav-link" href="/menu">Menu</a>
                            </div>
                            <div className="navbar-nav ms-auto">
                                <a className="nav-link active" aria-current="page" href="#">My Order</a>
                                <a className="nav-link" href="#">Cart</a>
                                <button type="button" class="btn btn-outline-primary">BackStage</button>
                                <button type="button" className="btn btn-success">Sign up</button>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default HeaderComponent;
