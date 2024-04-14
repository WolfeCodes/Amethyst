import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/frontend/Header.css'
import { LoginContext } from '../../contexts/LoginContext';


const Header = () => {
    const { user, SetUser } = useContext(LoginContext);
    const [loginUser, setLoginUser] = useState();

    const logout = () => {
        console.log('click click');
        localStorage.removeItem("token");
        SetUser(null);
        console.log(user);
    }

    // // Update loginUser state when user changes
    // useEffect(() => {
    //     setLoginUser(user);
    // }, [user]);

    return (
        <div className='header'>
            <nav className='navbar navbar-expand'>
                <div className='container-fluid'>
                    <div className="logo-wrapper">
                        <Link to="/" className='navbar-brand'>
                            <img src="https://donutbank.com/cdn/shop/products/WhiteIcingCakewithSprinkles.png?v=1695916793" alt="Logo" />
                        </Link>
                    </div>
                    <Link to="/" className='navbar-brand'>Donut Delights</Link>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link to="/" className="nav-link active" aria-current="page">Home</Link>
                            <Link to="/menu" className="nav-link">Menu</Link>
                        </div>
                        <div className="navbar-nav ms-auto">
                            <Link to="/order" className='nav-link active' aria-current="page">My Order</Link>
                            <Link to="/cart" className='nav-link active' aria-current="page">Cart</Link>
                            <Link to="/backstage/backhome" className="nav-link btn btn-outline-primary">BackStage</Link>

                            {user ? (
                                <>
                                    {/* <p>{loginUser.username}</p> */}
                                    <Link type="button" className="logout-bt" onClick={logout}>Logout</Link>

                                    {/* <button onClick={logout} className='btn btn-danger btn-lg'>Logout</button> */}
                                </>
                            ) : (
                                <Link type="button" className="signup-bt" to="/user">Log In</Link>
                            )}

                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;

