const express = require("express"); 
const router = express.Router(); 
const db = require("../models"); 
const { getOrder, createOrder, updateOrder } = require("../handlers/order"); 

router.get("/order/:orderid", getOrder);

router.post("/order", createOrder);

router.put("/order/:orderid", updateOrder);

module.exports = router;