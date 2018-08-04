const express = require("express"); 
const router = express.Router(); 
const db = require("../models"); 
const { getProducts, getProduct, createProduct, updateProduct } = require("../handlers/product"); 

router.get("/products", getProducts);

router.get("/product/:productid", getProduct);

router.post("/product", createProduct);

router.put("/product/:productid", updateProduct); 

module.exports = router;