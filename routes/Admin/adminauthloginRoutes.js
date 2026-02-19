let express= require("express")
let adminauthRoutes = express.Router()
const multer  = require('multer')
const { userLogin } = require("../../controller/adminauthloginController")

const upload = multer()



adminauthRoutes.post('/user-login', upload.none(), userLogin )







module.exports={adminauthRoutes}