import React, { useEffect, useState } from "react";

import {
  ASCENDING,
  COST,
  DESCENDING,
  NAME,
  NEGATIVE,
  POSITIVE,
  QUANTITY,
} from "../../constData/SortData";
import "./Section.css";

export function Section(props) {
  const { products } = props;
  const [sortBy, setSortBy] = useState();
  const [name, setName] = useState(ASCENDING);

  useEffect(() => {
    orderBy(products);
  }, [name, sortBy]);

  /**
   * @description to sort get sorted list based on input
   *
   * @param {event} event action by change
   */
  const handleChange = (event) => {
    setSortBy(event.target.value);
  };

  /**
   * @description changing value to ascending and descending
   */
  const handleClick = () => {
    name === ASCENDING ? setName(DESCENDING) : setName(ASCENDING);
  };

  /**
   * @description products list to get sorted based on input
   *
   * @param {array} sortProducts list of products to be sorted
   */
  const orderBy = (sortProducts) => {
    if (sortBy === NAME && name === ASCENDING) {
      let sortByData = [...sortProducts].sort((a, b) =>
        a.title > b.title ? POSITIVE : NEGATIVE
      );
      props.callSortBy(sortByData);
    } else if (sortBy === NAME && name === DESCENDING) {
      let sortByData = [...sortProducts].sort((a, b) =>
        a.title > b.title ? NEGATIVE : POSITIVE
      );
      props.callSortBy(sortByData);
    } else if (sortBy === COST && name === ASCENDING) {
      let sortByData = [...sortProducts].sort((a, b) => a.price - b.price);
      props.callSortBy(sortByData);
    } else if (sortBy === COST && name === DESCENDING) {
      let sortByData = [...sortProducts].sort((a, b) => b.price - a.price);
      props.callSortBy(sortByData);
    } else if (sortBy === QUANTITY && name === ASCENDING) {
      let sortByData = [...sortProducts].sort(
        (a, b) => a.productCount - b.productCount
      );
      props.callSortBy(sortByData);
    } else if (sortBy === QUANTITY && name === DESCENDING) {
      let sortByData = [...sortProducts].sort(
        (a, b) => b.productCount - a.productCount
      );
      props.callSortBy(sortByData);
    } else {
      props.callSortBy(sortProducts);
    }
  };

  return (
    <div className="d-flex justify-content-end section-header">
      <div className="form-check form-check-inline">
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          style={{ maxWidth: "300px" }}
          onChange={(event) => props.callSearch(event.target.value)}
        />
      </div>
      <div className="form-check form-check-inline Sort-Section">
        <span style={{ marginLeft: "-10px" }}>Sort By </span>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio1"
            value={NAME}
            checked={sortBy === NAME}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="inlineRadio1">
            Name
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio2"
            value={COST}
            checked={sortBy === COST}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="inlineRadio2">
            Cost
          </label>
        </div>
        <div className="form-check form-check-inline">
          <input
            className="form-check-input"
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio3"
            value={QUANTITY}
            checked={sortBy === QUANTITY}
            onChange={handleChange}
          />
          <label className="form-check-label" htmlFor="inlineRadio3">
            Quantity
          </label>
        </div>
      </div>

      <button
        style={{ backgroundColor: "#1E90FF", color: "white", border: "none" }}
        onClick={handleClick}
      >
        change to {name === ASCENDING ? DESCENDING : ASCENDING}
      </button>
    </div>
  );
}
