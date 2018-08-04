const mongoose = require("mongoose"); 
const moment = require("moment"); 

const productSchema = new mongoose.Schema({
    productname: { type: String, required: "Product name is required" },
    productimageurl: { type: String },
    productprice: { type: String, require: "Product price is required" },
    productdescription: { type: String },
    productquantity: { type: Number, required: "Product quantity is required" },
    datecreated: { 
        type: String, 
        default: moment().format("MMM Do YY")
    }
})

const Product = mongoose.model("Product", productSchema); 

module.exports = Product; 