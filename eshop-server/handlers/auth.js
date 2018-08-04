const db = require("../models"); 
const jwt = require("jsonwebtoken"); 
const bcrypt = require("bcrypt"); 

const SECRET_KEY = "rusty"

exports.signin = async function(req, res, next) {
	try {
		// Find user 
		let user = await db.User.findOne({
			username: req.body.username
		}).populate({ path: "orders" });
		let { 	id, 
                username,
                password,
                orders,
			} = user; 
		// Compare password using .compare 
		let isMatch = await user.comparePassword(req.body.password);

		// Sign token if user is correct
		if(isMatch) {
			let token = jwt.sign({
				id, 
				username,
			}, SECRET_KEY)
			return res.status(200).json({
				id,  
				username, 
				orders,
				token
			})
		} else { 
			return next({ status: 400, message: "Invalid username/password" })
		}
	} catch(e) {
		return next({ status: 400, message: "Invalid username/password" })
	}
}


exports.signup = async function(req, res, next) {
	try {
		// Create a user 
		let user = await db.User.create(req.body); 
		let { 
				id, 
				username, 
				orders
			} = user;   
		// Create a token 
		let token = jwt.sign({
			id, 
			username
		}, SECRET_KEY);

        return res.status(200).json({
            id, 
            username,  
            orders,
            token
        })

	} catch(err) {
		// if the validation fails 
		if(err.code === 11000) {
			err.message = "Sorry, that username and/or email is taken"
		}
		return next({
			status: 400, 
			message: err.message
		})
	}
}	