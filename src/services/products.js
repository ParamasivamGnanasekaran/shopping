import axios from 'axios';

export const getProducts = async () => {
  return await axios.get("http://localhost:8080/api/products")
    .then((response) => {
      return response.data
    }).catch((err) => {
      console.log(err)
    });
}


export const getCartProducts = async () => {
  return await axios.post("http://localhost:8080/api/products/cartProducts")
    .then((response) => {
      return response.data;
    }).catch((err) => {
      console.log(err)
    });
}

export const reduceProducts = async (products) => {
  let sendProducts = products.map(product => ({ id: product.id, quantity: product.quantity }));
  return await axios.post("http://localhost:8080/api/products/reduceProducts", { "product": sendProducts })
    .then((response) => {
      return response.data
    }).catch((err) => {
      console.log(err)
    });
}