import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleMinus, faCirclePlus } from "@fortawesome/free-solid-svg-icons";

import { NEGATIVE, POSITIVE } from "../../constData/SortData";
import "./Home.css";

export default function Card(props) {
  const { product } = props;

  return (
    <div className="card">
      <img
        src={product.image}
        alt="Avatar"
        style={{ width: "100%", height: "300px" }}
      />
      <div style={{ textAlign: "center" }}>
        <div>
          <div style={{ backgroundColor: "grey" }}>{product.title} </div>
          <p className="Card-description">{product.description}</p>
        </div>
        <div>
          <div style={{ backgroundColor: "grey" }}>RS.{product.price}</div>
          <p>left:{product.productCount}</p>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ display: "inline" }}>
          selected : {product.quantity ? product.quantity : 0}
        </div>
        <div style={{ display: "inline" }}>
          Total price: {product.quantity ? product.quantity * product.price : 0}
        </div>
      </div>
      {!product.quantity ? (
        <button
          className="add-cart-button"
          onClick={() => props.addToCart(product, POSITIVE)}
          disabled={!product.productCount}
        >
          Add To Cart
        </button>
      ) : (
        <div
          className="d-flex justify-content-end"
          style={{ margin: "1rem", height: "40px" }}
        >
          {product.quantity > 0 && (
            <FontAwesomeIcon
              icon={faCircleMinus}
              className="d-inline fontAs"
              onClick={() => props.addToCart(product, NEGATIVE)}
            />
          )}
          <p
            className="d-inline p-2"
            style={{ marginRight: "10px", marginTop: "5px" }}
          >
            {product.quantity}
          </p>
          {POSITIVE + product.quantity <= product.productCount && (
            <FontAwesomeIcon
              icon={faCirclePlus}
              className="d-inline fontAs"
              onClick={() => props.addToCart(product, POSITIVE)}
            />
          )}
        </div>
      )}
    </div>
  );
}
