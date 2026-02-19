let express = require("express")
const { signupRoutes } = require("./signupRoutes")
let webRoutes = express.Router()


webRoutes.use("/user",  signupRoutes)



module.exports={webRoutes}