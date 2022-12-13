import React, { useContext } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-custom-alert";

import CheckoutCard from "./CheckoutCard";
import { reduceProducts } from "../../services/products";
import { CartContext } from "../../App";
import "./Checkout.css";

export default function Checkout() {
  const { setCartProducts } = useContext(CartContext);
  let location = useLocation();
  const navigate = useNavigate();
  const products = location.state.checkOutProducts;

  /**
   * @description calculate total amount
   *
   * @returns total amount
   */
  const calculateAmount = () => {
    const sum = products.reduce((accumulator, product) => {
      return accumulator + product.quantity * product.price;
    }, 0);
    return sum;
  };

  const totalAmount = calculateAmount();

  /**
   * @description reudce products left quantatity
   *
   */
  const reduceProduct = async () => {
    if (products) {
      await reduceProducts(products).then(async (data) => {
        setCartProducts((cartProducts) => {
          return cartProducts.filter(
            (element) => !products.some((product) => element.id === product.id)
          );
        });
        toast.success("Payment Sucessfull!!");
        navigate("/", { replace: true });
      });
    }
  };

  return (
    <div>
      <div className="Checkout">
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <button className="checkout-Nav-Section">
            <NavLink
              to="/cart"
              style={{ textDecoration: "none", color: "white" }}
            >
              Back To Cart
            </NavLink>
          </button>
          <div style={{ display: "inline" }}>
            <h4>Checkout</h4>
          </div>
          <div style={{ display: "inline" }}>
            <p>total amount: {totalAmount}</p>
          </div>
          <button className="Payment-button" onClick={() => reduceProduct()}>
            Proceed To Payment
          </button>
        </div>
      </div>
      {products.length > 0 ? (
        products.map((product) => (
          <CheckoutCard key={product.id} product={product} />
        ))
      ) : (
        <div className="checkoutProductavailable">
          <h1>Checkout products Are Not avaliable</h1>
        </div>
      )}
    </div>
  );
}
