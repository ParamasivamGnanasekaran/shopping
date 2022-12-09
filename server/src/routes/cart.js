const fs = require('fs')
const router = require("express").Router();
const dataPath = './server/src/json/cart.json'
const dataPathProduct = './server/src/json/products.json'
const filter = require("../utils/filter")

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
        res.status(200).json(databases.find(user => user.userId === 1));
    } catch (err) {
        console.log(`Error reading file from disk: ${err}`)
    }
})

router.put('/1', (req, res) => {
    try {
        const data = fs.readFileSync(dataPath, "utf8");
        let databases = JSON.parse(data)
        let datas = databases.find(user => user.userId === 1)
        let check = false;
        datas.products.map((cart) => {
            if (cart.productId === req.body.productId) {
                cart.quantity = cart.quantity + 1;
                check = true;
            }
        })
        if (!check) {
            req.body.quantity = 1;
            datas.products.push(req.body)
        }
        databases.map((user) => {
            if (user.userId === 1) {
                user.products = datas.products
            }
        })
        fs.writeFile(dataPath, JSON.stringify(databases, null, 2), (error) => {
            if (error) {
                return;
            }
        });
        let cart = databases.find(user => user.userId === 1);
        const dataProduct = fs.readFileSync(dataPathProduct, "utf8");
        let databasesProduct = JSON.parse(dataProduct)
        res.status(200).json(filter.filterByCart(databasesProduct, cart.products));
    } catch (err) {
        console.log(`Error reading file from disk: ${err}`)
    }
})

router.put('/updateQuantity', (req, res) => {
    try {
        const data = fs.readFileSync(dataPath, "utf8");
        let databases = JSON.parse(data)
        let datas = databases.find(user => user.userId === 1)
        let carts;
        datas.products.map((cart) => {
            if (cart.productId === req.body.productId) {
                cart.quantity = cart.quantity + req.body.amount;
                carts = cart;
            }
        })
        databases.map((user) => {
            if (user.userId === 1) {
                user.products = datas.products
            }
        })
        fs.writeFile(dataPath, JSON.stringify(databases, null, 2), (error) => {
            if (error) {
                return;
            }
        });
        let cart = databases.find(user => user.userId === 1);
        const dataProduct = fs.readFileSync(dataPathProduct, "utf8");
        let databasesProduct = JSON.parse(dataProduct)
        let filterProducts = filter.filterByProducts(databasesProduct, cart.products)
        res.status(200).json({ carts: carts, products: filter.filterByCart(filterProducts, cart.products) });
    } catch (err) {
        console.log(`Error reading file from disk: ${err}`)
    }
})

router.delete('/removeCart/:id', (req, res) => {
    try {
        const data = fs.readFileSync(dataPath, "utf8");
        let databases = JSON.parse(data)
        let datas = databases.find(user => user.userId === 1)
        let filterDatas = datas.products.filter((cart) => cart.productId != req.params.id)
        databases.map((user) => {
            if (user.userId === 1) {
                user.products = filterDatas
            }
        })
        fs.writeFile(dataPath, JSON.stringify(databases, null, 2), (error) => {
            if (error) {
                return;
            }
        });
        let cart = databases.find(user => user.userId === 1)
        const dataProduct = fs.readFileSync(dataPathProduct, "utf8");
        let databasesProduct = JSON.parse(dataProduct)
        let filterProducts = filter.filterByProducts(databasesProduct, cart.products)
        res.status(200).json(filter.filterByCart(filterProducts, cart.products));
    } catch (err) {
        console.log(`Error reading file from disk: ${err}`)
    }
})

router.delete('/removeAllFromCart/1', (req, res) => {
    try {
        const data = fs.readFileSync(dataPath, "utf8");
        let databases = JSON.parse(data)
        let datas = databases.find(user => user.userId === 1)
        let filterDatas = datas.products.filter((cart) => cart.productId === -1)
        databases.map((user) => {
            if (user.userId === 1) {
                user.products = filterDatas
            }
        })
        fs.writeFile(dataPath, JSON.stringify(databases, null, 2), (error) => {
            if (error) {
                return;
            }
        });
        res.status(200).json(databases.find(user => user.userId === 1));
    } catch (err) {
        console.log(`Error reading file from disk: ${err}`)
    }
})

router.put('/removeCheckOutFromCart/1', (req, res) => {
    try {
        const data = fs.readFileSync(dataPath, "utf8");
        let databases = JSON.parse(data)
        let datas = databases.find(user => user.userId === 1)
        let filterDatas = datas.products.filter((cart) => !req.body.products.some((product) => product.id === cart.productId))
        databases.map((user) => {
            if (user.userId === 1) {
                user.products = filterDatas
            }
        })
        fs.writeFile(dataPath, JSON.stringify(databases, null, 2), (error) => {
            if (error) {
                return;
            }
        });
        res.status(200).json(databases.find(user => user.userId === 1));
    } catch (err) {
        console.log(`Error reading file from disk: ${err}`)
    }
})

module.exports = router;