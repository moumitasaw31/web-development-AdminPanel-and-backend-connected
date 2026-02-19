let express = require("express")
const multer = require("multer")
const { add, viewCategory, updateCategory, deleteCategory, multiDeleteCategory } = require("../../controller/categoryController")
let categoryRoutes = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/category')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + file.originalname)

    }
})

const upload = multer({ storage: storage })


categoryRoutes.post("/add", upload.single("categoryImage"), add)      //middlleware
categoryRoutes.get("/view", viewCategory)  
categoryRoutes.put("/update/:id", updateCategory)
categoryRoutes.delete("/delete/:id", deleteCategory)
categoryRoutes.post("/delete-multi", multiDeleteCategory)





module.exports = { categoryRoutes}