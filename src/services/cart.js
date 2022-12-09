import axios from 'axios';

export const addProductsToCart = (product) => {
  return axios.put("http://localhost:8080/api/cart/1", { "productId": product.id })
    .then((response) => {
      return response.data
    }).catch((err) => {
      console.log(err)
    });
}

export const updateQuantity = (amount, productId) => {
  return axios.put("http://localhost:8080/api/cart/updateQuantity", { "productId": productId, "amount": amount })
    .then((response) => {
      return response.data
    }).catch((err) => {
      console.log(err)
    });
}

export const removeFromCart = (productId) => {
  return axios.delete(`http://localhost:8080/api/cart/removeCart/${productId}`)
    .then((response) => {
      return response.data
    }).catch((err) => {
      console.log(err)
    });
}


export const removeCheckOutFromCart = (products) => {
  return axios.put("http://localhost:8080/api/cart/removeCheckOutFromCart/1", { "products": products })
    .then((response) => {
      return response.data;
    }).catch((err) => {
      console.log(err)
    });
} 