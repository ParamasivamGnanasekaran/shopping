import React, { useEffect, useRef, useState } from "react";

import { NEGATIVE, POSITIVE } from "../../constData/SortData";
import "./Cart.css";

export default function CartCard(props) {
  const { product } = props;
  const effectRan = useRef(false);
  const [isChecked, setIsChecked] = useState(true);

  /**
   * @description update value product quantity
   *
   * @param {number} amount update quantity value
   */
  const adjustCount = async (amount) => {
    if (
      amount + product.quantity > 0 &&
      amount + product.quantity <= product.productCount
    ) {
      await props.callCartAdd(amount, product.id);
    }
  };

  /**
   * @description changing checkbox value
   */
  const handleOnChange = () => {
    setIsChecked(!isChecked);
    props.callCheck(!isChecked, product);
  };

  useEffect(() => {
    if (effectRan.current === false) {
      const changeData = async () => {
        props.callCheck(isChecked, product);
      };
      changeData();
    }
    return () => {
      effectRan.current = true;
    };
  }, [isChecked]);

  return (
    <div style={{ padding: "20px" }}>
      <div className="Cart-Card">
        <img
          className="Img-cart-card"
          src={product.image}
          alt={product.title}
        />
        <div style={{ width: "140px", wordBreak: "break-word" }}>
          {product.title}{" "}
        </div>
        <div>RS.{product.price}</div>
        <div>left:{product.productCount}</div>
        <div className="Quantity-Section">
          {product.quantity > 1 && (
            <button className="Minus" onClick={() => adjustCount(NEGATIVE)}>
              -
            </button>
          )}
          <p style={{ marginRight: "10px" }}>selected:{product.quantity}</p>
          <p style={{ paddingRight: "10px" }}>
            total amount:{product.price * product.quantity}
          </p>
          {POSITIVE + product.quantity <= product.productCount && (
            <button className="Plus" onClick={() => adjustCount(POSITIVE)}>
              +
            </button>
          )}
        </div>
        <button
          className="Remove-Cart"
          onClick={() => props.callCartDelete(product.id)}
        >
          Remove From Cart
        </button>
        <div className="topping">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleOnChange}
          />
        </div>
      </div>
    </div>
  );
}
