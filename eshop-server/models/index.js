const mongoose = require("mongoose");  
mongoose.Promise = Promise; 
mongoose.connect("mongodb://localhost/eshop", function(err, res) {
	if(err) {
		console.log("DB CONNECTION FAILED" + err);
	} else {
		console.log("DB CONNECTION SUCCESS" + res);
	}
})

module.exports.User = require("./user");
module.exports.Order = require("./order"); 
module.exports.Product = require("./product"); 
