import React from 'react'
import { Link } from 'react-router-dom';

function BackHeader() {
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
              <button type="button" className="btn btn-success">Sign up</button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default BackHeader
