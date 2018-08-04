const express = require("express"); 
const app = express(); 
const bodyParser = require("body-parser"); 
const cors = require("cors");

const errorHandler = require("./handlers/error");

// App requires
const authRoutes = require("./routes/auth"); 
const orderRoutes = require("./routes/order"); 
const productRoutes = require("./routes/product"); 

const PORT = 8080 || process.env.PORT; 

// App config
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());  

app.use("/api/auth", authRoutes);
app.use("/api", productRoutes); 
app.use("/api/user/:id", orderRoutes); 

app.use(function(req, res, next) {
	let err = new Error("Not Found"); 
	err.status = 404; 
	next(err); 
})

app.use(errorHandler);

// App listen 
app.listen(PORT, () => {
	console.log(`The server is listening on port ${PORT}`); 
})
