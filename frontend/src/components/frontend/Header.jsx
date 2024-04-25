import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/frontend/Header.css'
import { LoginContext } from '../../contexts/LoginContext';
import { useCart } from '../../contexts/CartContext';
import { getUserInfo } from '../../services/UserService';


const Header = () => {
    const { user, SetUser } = useContext(LoginContext);
    const { cartQuantity, clearCartQuantity } = useCart();
    const [loginUser, setLoginUser] = useState();
    const [userRole, setUserRole] = useState();

    useEffect(() => {
        const token = localStorage.getItem("token");
        SetUser(token);
        getUserInfo(token).then(response => {
            setUserRole(response.data.role);
            console.log("Role", userRole);
        })
    })


    const logout = () => {
        console.log('click click');
        localStorage.removeItem("token");
        SetUser(null);
        clearCartQuantity();
        console.log(user);
    }

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
                            <Link to="/cart" className='nav-link active' aria-current="page">Cart({cartQuantity})</Link>
                            {/* <Link to="/backstage/backhome" className="nav-link btn btn-outline-primary">BackStage</Link> */}
                            {user && userRole === "[Admin]" ? (
                                <>
                                    {/* <p>{loginUser.username}</p> */}
                                    <Link to="/backstage/backhome" className="nav-link btn btn-outline-primary">BackStage</Link>
                                </>
                            ) : (
                                <>
                                </>
                            )}
                            {user ? (
                                <>
                                    {/* <p>{loginUser.username}</p> */}
                                    <span className="logout-bt" onClick={logout}>Logout</span>
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

