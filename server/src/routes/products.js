const fs = require("fs");
const router = require("express").Router();
const dataPathProduct = "./server/src/json/products.json";

/**
 * @description get products list from products.json file
 */
router.get("/", (req, res) => {
  try {
    const data = fs.readFileSync(dataPathProduct, "utf8");
    let databases = JSON.parse(data);
    res.status(200).json(databases);
  } catch (err) {
    console.log(`Error reading file from disk: ${err}`);
  }
});

/**
 * @description reducing quantity of items in products.json
 */
router.post("/reduceProducts", (req, res) => {
  try {
    const data = fs.readFileSync(dataPathProduct, "utf8");
    let databases = JSON.parse(data);
    databases.map((original) => {
      req.body.product.map((data) => {
        if (original.id === data.id) {
          original.productCount = original.productCount - data.quantity;
        }
      });
    });
    fs.writeFile(
      dataPathProduct,
      JSON.stringify(databases, null, 2),
      (error) => {
        if (error) {
          return;
        }
      }
    );
    res.status(200).json(databases);
  } catch (err) {
    console.log(`Error reading file from disk: ${err}`);
  }
});

module.exports = router;
