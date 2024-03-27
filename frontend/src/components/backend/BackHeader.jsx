import React from 'react'
import { Link } from 'react-router-dom';

function BackHeader({ }) {
  return (
    <header>
      <nav className='navbar navbar-expand bg-body-tertiary'>
        <div className='container-fluid'>

          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <Link to="/" className="nav-link active" aria-current="page">Home</Link>
            </div>
            <div className="navbar-nav ms-auto">
              <Link to="/" className="nav-link btn btn-outline-primary">DonutsDelights</Link>
              <button type="button" className="btn btn-success">Sign up</button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default BackHeader
