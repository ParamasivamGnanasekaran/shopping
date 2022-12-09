const fs = require('fs');
const router = require("express").Router();
const dataPath = './server/src/json/user.json'

router.get('/', (req, res) => {
  try {
    const data = fs.readFileSync(dataPath, "utf8");
    let databases = JSON.parse(data)
    res.status(200).json(databases);
  } catch (err) {
    console.log(`Error reading file from disk: ${err}`)
  }
})

router.get('/1', (req, res) => {
  try {
    const data = fs.readFileSync(dataPath, "utf8");
    let databases = JSON.parse(data)
    let value = databases.find(user => user.id === 1)
    res.status(200).json(value);
  } catch (err) {
    console.log(`Error reading file from disk: ${err}`)
  }
})

router.put('/1', (req, res) => {
  try {
    const data = fs.readFileSync(dataPath, "utf8");
    let databases = JSON.parse(data)
    let datas = databases.find(user => user.id === 1)
    let check = false;
    datas.cart.map((cart) => {
      if (cart.id === req.body.id) {
        cart.quantity = cart.quantity + 1;
        check = true;
      }
    })
    if (!check) {
      delete req.body.rating;
      delete req.body.productCount;
      req.body.quantity = 1;
      datas.cart.push(req.body)
    }
    databases.map((user) => {
      if (user.id === 1) {
        user.address = datas.address;
        user.email = datas.email;
        user.username = datas.username;
        user.password = datas.password;
        user.name = datas.name
        user.phone = datas.phone
        user.__v = datas.__v
        user.cart = datas.cart
      }
    })
    fs.writeFile(dataPath, JSON.stringify(databases, null, 2), (error) => {
      if (error) {
        return;
      }
    });
    res.status(200).json(databases.find(user => user.id === 1));
  } catch (err) {
    console.log(`Error reading file from disk dta: ${err}`)
  }
})

module.exports = router;