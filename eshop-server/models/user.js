const mongoose = require("mongoose"); 
const bcrypt = require("bcrypt"); 
const moment = require("moment");

const userSchema = new mongoose.Schema({ 
    username: { type: String, unique: true, required: "Username is required" },
    password: { type: String, required: "Password is required" }, 
    orders:  [
            {
                type: mongoose.Schema.Types.ObjectId, 
                ref: "Order"
            }
    ],
 	datecreated: { 
 		type: String, 
 		default: moment().format("MMM Do YY")
 	}
})

userSchema.pre("save", async function(next) {
	try {
		if(!this.isModified("password")) {
			return next(); 
		}
		let hashedPassword = await bcrypt.hash(this.password, 10); 
		this.password = hashedPassword; 
		return next(); 
	} catch(err) {
		return next(err); 
	}
})


userSchema.pre("remove", async function(next) {
	try {
		// find user by id 
		let user = await User.findById(this._id); 
		// Remove user from message 
		user.posts.remove();
		// Save the user 
		await user.save();
		// Return next
		return next();
	} catch(err) {
		return next(err)
	}
})

userSchema.methods.comparePassword = async function(candidatePassword, next) {
  try {
    let isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    return next(err);
  }
};

const User = mongoose.model("User", userSchema); 

module.exports = User; 
