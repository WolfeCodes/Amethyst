import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { LoginContext } from '../../contexts/LoginContext';


function BackHeader() {

  const { user, SetUser } = useContext(LoginContext);
  const [loginUser, setLoginUser] = useState();

  const logout = () => {
    console.log('click click');
    localStorage.removeItem("token");
    SetUser(null);
    console.log(user);
  }

  return (
    <header>
      <nav className='navbar navbar-expand bg-body-tertiary'>
        <div className='container-fluid'>

          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            {/* <div className="navbar-nav">
              <Link to="/backstage/backhome" className="nav-link active" aria-current="page">{companyName}</Link>
            </div> */}
            <div className="navbar-nav ms-auto  justify-content-start">
              <Link to="/" className="nav-link active">DonutsDelights</Link>

              {user ? (
                <>
                  {/* <p>{loginUser.username}</p> */}
                  <Link type="button" className="logout-bt" onClick={logout}>Logout</Link>
                </>
              ) : (
                <button type="button" className="btn btn-success">Log in</button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default BackHeader
