const db = require("../models"); 

exports.getProducts = async function (req, res, next)  {
    try {
        // The (GET) route will look something like this - /api/products
        let foundProducts = await db.Product.find({}); 

        return res.status(200).json(foundProducts); 
    } catch(err) {
        return next(err)
    }
}

exports.getProduct = async function(req, res, next) {
    try {
        // The (GET) route will look something like this - /api/product/:productid
        let foundProduct = await db.Product.findById(req.params.productid); 

        return res.status(200).json(foundProduct); 
    } catch(err) {
        return next(err)
    }
} 

exports.createProduct = async function(req, res, next) {
    try {
        // The (POST) route will look something like this - /api/product
        let createdProduct = await db.Product.create({
            productname: req.body.productname, 
            productimageurl: req.body.productimageurl,
            productprice: req.body.productprice, 
            productdescription: req.body.productdescription,
            productquantity: req.body.productquantity
        }); 

        return res.status(200).json(createdProduct);
    } catch(err) {
        return next(err); 
    }
}

exports.updateProduct = async function(req, res, next) {
    try {
        // The (PUT) route will look something like this - /api/product/:productid
        let newProduct = {
            productname: req.body.productname, 
            productimageurl: req.body.productimageurl,
            productprice: req.body.productprice, 
            productdescription: req.body.productdescription,
            productquantity: req.body.productquantity
        }

        let updateProduct = await db.Product.find(req.params.productid)

        await updateProduct.update(newProduct);

        return res.status(200).json(updateProduct);
    } catch(err) {  
        return next(err) 
    }
}