import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand  fixed-top navbar-dark bg-dark" style={{ maxHeight: '60px' }}>
        <div className="container-fluid">
          <div className="navbar-brand"><h4>SOLITON SHOPPING APP</h4></div>
          <div className="collapse navbar-collapse" style={{ display: 'flex', justifyContent: 'flex-end' }} id="navbarNav" >
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link active" to="/" style={{ margin: "1rem", textDecoration: 'none', color: 'white' }}><h6>HOME</h6></NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/cart" style={{ margin: "1rem", textDecoration: 'none', color: 'white' }}><h6>CART</h6></NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
};

