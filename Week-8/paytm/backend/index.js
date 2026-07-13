const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const routeRouter = require("./routes/index");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", routeRouter);


app.listen(3000, function () {
    console.log("Listing on PORT 3000")
})






// If you know all request are start from the api/v1. In future you might release a api/v2 of your apis. So if you want to switch to v2 apis to can do like, v1 request please go here app.use("api/v1", routeRouter); and v2 request please go here app.use("api/v1", routeRouterV2);. This is the way to prefix your apis. So all the request which prefix is api/v1 will go to the routeRouter. app.use("api/v1", routeRouterV2); // If you use 2 argument then it will call the route and if the argument is single then it will become a middleware. 
