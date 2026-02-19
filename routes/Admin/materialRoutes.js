let express = require ("express")
const { viewMaterial, add, deleteData, multiDelete } = require("../../controller/materialController")
let materialRoutes= express.Router()



materialRoutes.get("/view", viewMaterial)  
materialRoutes.post("/add", add)
// colorRoutes.put("/update/:id", updateOneColor)
materialRoutes.delete("/delete/:id", deleteData ) 
materialRoutes.post("/delete-multi", multiDelete)



module.exports={materialRoutes}