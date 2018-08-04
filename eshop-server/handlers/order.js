const db = require("../models"); 

exports.getOrder = async function(req, res, next) {
    try {
        // The (GET) route will look something like this - /api/user/:id/order/:orderid
        let foundOrder = await db.Order.findById(req.params.orderid); 

        return res.status(200).json(foundOrder); 
    } catch(err) {
        return next(err)
    }
} 

exports.createOrder = async function(req, res, next) {
    try {
        // The (POST) route will look something like this - /api/user/:id/order
        let createdOrder = await db.Order.create({
            ordername: req.body.ordername, 
            orderquantity: req.body.orderquantity,
            ordertotal: req.body.ordertotal, 
        }); 

        return res.status(200).json(createdOrder);
    } catch(err) {
        return next(err); 
    }
}

exports.updateOrder = async function(req, res, next) {
    try {
        // The (PUT) route will look something like this - /api/user/:id/order/:orderid
        let newOrder = {
            orderstatus: req.body.orderstatus 
        }

        let updateOrder = await db.Order.find(req.params.orderid)

        await updateOrder.update(newOrder);

        return res.status(200).json(updateOrder);
    } catch(err) {  
        return next(err) 
    }
}