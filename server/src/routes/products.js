const fs = require('fs')
const router = require("express").Router();
const dataPathProduct = './server/src/json/products.json'
const dataPathCart = './server/src/json/cart.json'
const filter = require("../utils/filter")

router.get('/data', (req, res) => {
  try {
    const data = fs.readFileSync(dataPathProduct, "utf8");
    let databases = JSON.parse(data)
    res.status(200).json(databases);
  } catch (err) {
    console.log(`Error reading file from disk: ${err}`)
  }
})

router.get('/', (req, res) => {
  try {
    const dataProduct = fs.readFileSync( dataPathProduct, "utf8");
    let databasesProduct = JSON.parse(dataProduct)
    const dataCart = fs.readFileSync(dataPathCart, "utf8");
    let databasesCart = JSON.parse(dataCart)
    let cart = databasesCart.find(user => user.userId === 1);
    res.status(200).json(filter.filterByCart(databasesProduct, cart.products));
  } catch (err) {
    console.log(`Error reading file from disk: ${err}`)
  }
})

router.post('/cartProducts', (req, res) => {
  try {
    const dataCart = fs.readFileSync(dataPathCart, "utf8");
    let databasesCart = JSON.parse(dataCart)
    let cart = databasesCart.find(user => user.userId === 1);
    const dataProduct = fs.readFileSync(dataPathProduct, "utf8");
    let databases = JSON.parse(dataProduct)
    let filterProducts = filter.filterByProducts(databases, cart.products)
    res.status(200).json(filter.filterByCart(filterProducts, cart.products));
  } catch (err) {
    console.log(`Error reading file from disk: ${err}`)
  }
});


router.post('/reduceProducts', (req, res) => {
  try {
    const data = fs.readFileSync(dataPathProduct, "utf8");
    let databases = JSON.parse(data)
    databases.map((original) => {
      req.body.product.map((data) => {
        if (original.id === data.id) {
          original.productCount = original.productCount - data.quantity
        }
      })
    })
    fs.writeFile(dataPathProduct, JSON.stringify(databases, null, 2), (error) => {
      if (error) {
        return;
      }
    });
    res.status(200).json(databases);
  } catch (err) {
    console.log(`Error reading file from disk: ${err}`)
  }
});



module.exports = router;