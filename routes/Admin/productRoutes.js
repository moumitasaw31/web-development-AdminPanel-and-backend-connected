let express = require("express")
const multer = require("multer")
const { parentCategoryData, getSubCategoryData, getSubSubCategoryData, getMaterial, getColor, savedata } = require("../../controller/productController")
const { productView } = require("../../controller/productController")
const { deleteProduct } = require("../../controller/productController")
let productRoutes = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/product')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)

    }
})

const upload = multer({ storage: storage })



productRoutes.post("/savedata", upload.fields([

    { name: "productImage", maxCount: 1 },
    { name: "backImage", maxCount: 1 },
    { name: "galleryImage", maxCount: 30 }

]), savedata)
productRoutes.get("/categoryview", parentCategoryData)
productRoutes.get("/subcategoryview/:pid", getSubCategoryData)
productRoutes.get("/sub-subcategoryview/:subid", getSubSubCategoryData)
productRoutes.get("/material", getMaterial)
productRoutes.get("/color", getColor)
productRoutes.get("/product-view", productView)
productRoutes.delete("/delete-product/:id", deleteProduct)






// productRoutes.get("/viewsubsub", viewsubsub )




module.exports = { productRoutes }