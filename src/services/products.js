import axios from "axios";

const host = "http://localhost:8080/api/products";

/**
 * @description getting list of products as array of objects
 *
 * @returns list products in array
 */
export const getProducts = async () => {
  return await axios
    .get(host)
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};

/**
 * @description reducing product quantity in server
 *
 * @param {array} products products to reduce values
 * @returns reponse of action
 */
export const reduceProducts = async (products) => {
  let sendProducts = products.map((product) => ({
    id: product.id,
    quantity: product.quantity,
  }));
  return await axios
    .post(`${host}/reduceProducts`, {
      product: sendProducts,
    })
    .then((response) => {
      return response.data;
    })
    .catch((err) => {
      console.log(err);
    });
};
