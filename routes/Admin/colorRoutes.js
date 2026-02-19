let express= require("express")
const { viewColor, addColor, updateOneColor, deleteColor, multiDelete } = require("../../controller/colorController")
let colorRoutes= express.Router()


colorRoutes.get("/view-color", viewColor)  
colorRoutes.post("/add-color", addColor)
colorRoutes.put("/update-color/:id", updateOneColor)
colorRoutes.delete("/delete-color/:id", deleteColor) 
colorRoutes.post("/delete-multi", multiDelete)   








module.exports={colorRoutes}