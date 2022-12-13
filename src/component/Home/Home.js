import React, { useContext, useEffect, useRef, useState } from "react";

import { CartContext } from "../../App";
import Card from "./Card";
import { CustomLoading } from "../CustomLoading/CustomLoading";
import { Section } from "../Section/Section";
import { getProducts } from "../../services/products";
import { POSITIVE } from "../../constData/SortData";
import "./Home.css";

export default function Home() {
  const [showProducts, setShowProducts] = useState([]);
  const { cartProducts, setCartProducts } = useContext(CartContext);
  const effectRan = useRef(false);
  const [search, setSearch] = useState([]);

  useEffect(() => {
    if (effectRan.current === true) {
      const fetchProducts = async () => {
        await getProducts().then((products) => {
          if (cartProducts) {
            setShowProducts((showProducts) =>
              filterByCart(products, cartProducts)
            );
          } else {
            setShowProducts(products);
          }
        });
      };
      fetchProducts();
    }
    return () => {
      effectRan.current = true;
    };
  }, []);

  /**
   * @description set sort products value
   *
   * @param {array} products list of sorted products list
   */
  const callSortBy = (products) => {
    setShowProducts(products);
  };

  /**
   * @description updating carts items quantity and list of values
   *
   * @param {number} amount value to be update
   * @param {number} product product id
   */
  const addToCart = async (product, amount) => {
    if (product.quantity <= product.productCount) {
      let check = true;
      cartProducts.map((cart) => {
        if (cart.id === product.id) {
          if (cart.quantity + amount > 0) {
            cart.quantity = cart.quantity + amount;
            check = false;
          }
        }
        setShowProducts((showProducts) =>
          filterByCart(showProducts, cartProducts)
        );
      });
      if (check) {
        setCartProducts((products) => {
          return products.filter((pro) => pro.id !== product.id);
        });
        setShowProducts((showProducts) =>
          showProducts.map((products) => {
            if (product.id === products.id) {
              delete products.quantity;
            }
            return products;
          })
        );
      }
    } else if (product.quantity === undefined) {
      showProducts.map((products) => {
        if (products.id === product.id) {
          products.quantity = POSITIVE;
          setCartProducts((cartProducts) => [...cartProducts, products]);
        }
      });
    }
  };

  /**
   * @description filter products
   *
   * @param {array} arr1 products list
   * @param {array} arr2 cart items list
   * @returns list of filter array of objects
   */
  const filterByCart = (arr1, arr2) => {
    let result = [];
    result = arr1.filter((el) => {
      return arr2.map((element) => {
        if (element.id === el.id) {
          el.quantity = element.quantity;
        }
        return el;
      });
    });
    return result;
  };

  return (
    <div className="">
      <Section
        products={showProducts}
        callSortBy={(products) => callSortBy(products)}
        callSearch={(query) => setSearch(query)}
      />
      {showProducts.length > 0 ? (
        <div className="Home-area">
          <div className="Home-Section">
            {showProducts
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
                <div className="Home-card" key={product.id}>
                  <Card
                    key={product.id}
                    product={product}
                    addToCart={(product, amount) => addToCart(product, amount)}
                  />
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div style={{ marginTop: "20%" }}>
          <CustomLoading />
        </div>
      )}
    </div>
  );
}
