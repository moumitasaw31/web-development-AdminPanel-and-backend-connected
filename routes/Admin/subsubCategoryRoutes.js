let express = require("express")
const multer = require("multer")
const { parentCategory, subCategory, savedata, viewsubsub } = require("../../controller/subsubCategoryController")

let subsubCategoryRoutes = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/subsubCategory')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)
        
    }
})

const upload = multer({ storage: storage })



subsubCategoryRoutes.post("/savedata", upload.single("subsubCategoryImage"), savedata)
subsubCategoryRoutes.get("/categoryview", parentCategory)
subsubCategoryRoutes.get("/subcategoryview/:parentid", subCategory)
subsubCategoryRoutes.get("/viewsubsub", viewsubsub )




module.exports ={subsubCategoryRoutes}

