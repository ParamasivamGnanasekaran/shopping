import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-custom-alert";

import CartCard from "./CartCard";
import { Section } from "../Section/Section";
import { CartContext } from "../../App";

import "./Cart.css";

export default function Cart() {
  const { cartProducts, setCartProducts } = useContext(CartContext);
  const [search, setSearch] = useState([]);
  const [checkOutProducts, setCheckOutProducts] = useState([]);

  /**
   * @description removing cart item
   *
   * @param {number} productId product id
   */
  const callCartDelete = async (productId) => {
    setCheckOutProducts((products) => {
      return products.filter((product) => product.id !== productId);
    });
    setCartProducts((cartProducts) => {
      return cartProducts.filter((pro) => pro.id !== productId);
    });
    toast.error("Product Remove From Cart!!");
  };

  /**
   * @description updating quantty
   *
   * @param {number} amount value to be update
   * @param {number} productId product id
   */
  const callCartAdd = async (amount, productId) => {
    let mapcartProducts = cartProducts.map((cart) => {
      if (cart.id === productId) {
        cart.quantity = cart.quantity + amount;
      }

      return cart;
    });
    setCartProducts(mapcartProducts);
  };

  /***
   * @description sorted products list
   *
   */
  const callSortBy = (products) => {
    setCartProducts(products);
  };

  /**
   * @description add and removing products checkout products list
   *
   * @param {bool} isChecked product checked box value
   * @param {object} product product
   */
  const callCheck = (isChecked, product) => {
    if (isChecked) {
      setCheckOutProducts((searches) => [...searches, product]);
    } else {
      setCheckOutProducts((searches) =>
        searches.filter((products) => products.id !== product.id)
      );
    }
  };

  return (
    <div>
      <Section
        products={cartProducts}
        callSortBy={(products) => callSortBy(products)}
        callSearch={(query) => setSearch(query)}
      />
      <div style={{ backgroundColor: "#D3D3D3" }}>
        <div
          className="CartNav"
          // style={{
          //   padding: "20px",
          //   display: "flex",
          //   justifyContent: "space-around",
          // }}
        >
          <button
            className="Back-Home-Button"
            // style={{
            //   backgroundColor: "#1E90FF",
            //   color: "white",
            //   border: "none",
            //   display: "inline",
            // }}
          >
            <NavLink
              className="Nav-link"
              to="/"
              // style={{ margin: "1rem", textDecoration: "none", color: "white" }}
            >
              Back To Home
            </NavLink>
          </button>
          <div style={{ display: "inline" }}>
            <h4>CART</h4>
          </div>
          <button
            className="Checkout-button"
            // style={{
            //   backgroundColor: "#1E90FF",
            //   border: "none",
            //   display: "inline",
            // }}
          >
            <NavLink
              className="Nav-link"
              to={{ pathname: "/checkout" }}
              state={{ checkOutProducts }}
              // style={{ margin: "1rem", textDecoration: "none", color: "white" }}
            >
              Go To Checkout
            </NavLink>
          </button>
        </div>
        {cartProducts.length > 0 ? (
          cartProducts
            .filter((product) => {
              if (search === "") {
                return product;
              } else if (
                product.title
                  .toString()
                  .toLowerCase()
                  .includes(search.toString().toLowerCase())
              ) {
                return product;
              }
            })
            .map((product) => (
              <CartCard
                key={product.id}
                product={product}
                callCartDelete={(productId) => callCartDelete(productId)}
                callCartAdd={(amount, productId) =>
                  callCartAdd(amount, productId)
                }
                callCheck={(isChecked, product) =>
                  callCheck(isChecked, product)
                }
              />
            ))
        ) : (
          <div className="available">
            <h1>Cart Products Are Not avaliable</h1>
          </div>
        )}
      </div>
    </div>
  );
}
