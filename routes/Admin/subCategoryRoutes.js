let express = require("express")
const multer = require("multer")

const { viewSubCategory, updateSubCategory, deleteSubCategory, multiDeleteSubCategory, categoryView, addSubCategory } = require("../../controller/subCategoryController")
let subcategoryRoutes = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/subCategory')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)

    }
})

const upload = multer({ storage: storage })


subcategoryRoutes.post("/add", upload.single("subCategoryImage"), addSubCategory)      //middlleware for receive image
subcategoryRoutes.get("/categoryview", categoryView) 
subcategoryRoutes.get("/view", viewSubCategory)  
subcategoryRoutes.put("/update/:id", updateSubCategory)
subcategoryRoutes.delete("/delete/:id", deleteSubCategory)
subcategoryRoutes.post("/delete-multi", multiDeleteSubCategory)





module.exports = { subcategoryRoutes}