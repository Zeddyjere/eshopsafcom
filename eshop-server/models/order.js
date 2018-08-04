const mongoose = require("mongoose"); 
const moment = require("moment"); 

const orderSchema = new mongoose.Schema({
    ordername: { type: String, required: "Order name is required"  }, 
    orderquantity: { type: Number, required: "Order quantity is required" },
    ordertotal: { type: Number, required: "Order total price is required" },
    orderstatus: { type: String, default: "Pending" },
    datecreated: { 
        type: String, 
        default: moment().format("MMM Do YY")
    }
})

const Order = mongoose.model("Order", orderSchema); 

module.exports = Order;