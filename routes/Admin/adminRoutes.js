const express = require("express")
const { colorRoutes } = require("./colorRoutes")
const { materialRoutes } = require("./materialRoutes")
const { categoryRoutes } = require("./categoryRoutes")
const { subcategoryRoutes } = require("./subCategoryRoutes")
const { subsubCategoryRoutes } = require("./subsubCategoryRoutes")
const { productRoutes } = require("./productRoutes")
const { adminauthRoutes } = require("./adminauthloginRoutes")
let adminRoutes= express.Router()



adminRoutes.use("/color", colorRoutes)    //  /color will be a fixed prefix on api url
adminRoutes.use("/material",materialRoutes)
adminRoutes.use("/category", categoryRoutes)
adminRoutes.use("/subcategory", subcategoryRoutes)
adminRoutes.use("/subsubCategory", subsubCategoryRoutes)
adminRoutes.use("/product", productRoutes)
adminRoutes.use("/auth-login", adminauthRoutes)








module.exports= {adminRoutes}
