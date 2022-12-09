//Import modules
const express = require("express");
const app = express();
let bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const cors = require("cors");
app.use(
  cors({
    origin: "*",
  })
);
//const path = require("path");

// Server PORT number
const port = process.env.PORT || 8080;

//routes file import
const userRouter = require("./src/routes/user.js");
const productsRouter = require("./src/routes/products.js");
const cartRouter = require("./src/routes/cart.js");

app.use("/api/user",userRouter);
app.use("/api/products",productsRouter);
app.use("/api/cart", cartRouter);


app.listen(port, () => {
  console.log(`Backend App listening on port ${port}`);
})