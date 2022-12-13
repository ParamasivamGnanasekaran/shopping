import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faShoppingCart,
  faHouseChimney,
} from "@fortawesome/free-solid-svg-icons";

import { CartContext } from "../../App";

export default function Navbar() {
  const { cartProducts } = useContext(CartContext);

  return (
    <>
      <nav
        className="navbar navbar-expand  fixed-top navbar-dark bg-dark"
        style={{ maxHeight: "60px" }}
      >
        <div className="container-fluid">
          <div className="navbar-brand">
            <h4>SOLITON SHOPPING APP</h4>
          </div>
          <div
            className="collapse navbar-collapse Header-Nav-Section"
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "30px",
            }}
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link Nav-store" to="/">
                  <span className="fa-layers fa-2x fa-fw">
                    <FontAwesomeIcon icon={faHouseChimney} />
                  </span>
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link Nav-store" to="/cart">
                  <span className="fa-layers fa-2x fa-fw">
                    <FontAwesomeIcon icon={faShoppingCart} />
                    <span className="fa-layers-counter fs-1">
                      {cartProducts ? cartProducts.length : 0}
                    </span>
                  </span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}
