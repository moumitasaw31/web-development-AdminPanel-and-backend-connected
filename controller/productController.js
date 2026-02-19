
const { categoryModel } = require("../model/categoryModel")
const colorModel = require("../model/colorModel")
const materialModel = require("../model/materialModel")
const { productModel } = require("../model/productModel")
const { subcategoryModel } = require("../model/subcategoryModel")
const { subsubcategoryModel } = require("../model/subsubCategoryModel")

let parentCategoryData = async (req, res) => {

    try {
        let categoryData = await categoryModel.find({ categoryStatus: true }).select("categoryName") // 

        // if (categoryData.length === 0) return res.send({ msg: "no category Data found" })



        let obj = {
            status: 1,
            msg: "category Data viewed",
            categoryData

        }
        res.send(obj)

    }
    catch (err) {

        console.log(err)

        let obj = {
            status: 0,
            msg: "something went wrong",
            err

        }

        res.send(obj)


    }

}

let getSubCategoryData = async (req, res) => {

    let { pid } = req.params

    let subCatData = await subcategoryModel.find({ parentCategory: pid }).select("subCategoryName")

    let obj = {
        status: 1,
        msg: "Sub category Data viewed",
        subCatData

    }
    res.send(obj)


}

let getSubSubCategoryData = async (req, res) => {

    let { subid } = req.params

    try {
        let subsubCatData = await subsubcategoryModel.find({ subCategoryName: subid }).select("subsubCategoryName")

        let obj = {
            status: 1,
            msg: "Sub Sub category Data viewed",
            subsubCatData

        }
        res.send(obj)

    }

    catch (err) {

        console.log(err)

        let obj = {
            status: 0,
            msg: "something went wrong",
            err

        }

        res.send(obj)


    }




}

let getMaterial = async (req, res) => {

    let materialData = await materialModel.find()

    let obj = {
        status: 1,
        msg: "material data viewed",
        materialData

    }
    res.send(obj)

}

let getColor = async (req, res) => {

    let colorData = await colorModel.find()

    let obj = {
        status: 1,
        msg: "color data viewed",
        colorData

    }
    res.send(obj)

}

let savedata = async (req, res) => {

    let contentObj = { ...req.body }    //  1st jo aaya copy hua

    // all are inputs name   same with model name

    if (req.files.productImage) {         // productimage  agar aa rha hai tab
        contentObj["productImage"] = req.files.productImage[0].filename

    }
    if (req.files.backImage) {          //  backimage agar aa rha hai tab
        contentObj["backImage"] = req.files.backImage[0].filename


    }
    if (req.files.galleryImage) {
        contentObj["galleryImage"] = req.files.galleryImage.map((v) => v.filename)

    }
    if (req.body.description) {
        contentObj.description = contentObj.description.replace(/<[^>]*>/g, "");   //

    }




    let insertObj = await productModel.create(contentObj)

    let obj = {

        status: 1,
        msg: "product added",
        insertObj
    }

    res.send(obj)



}


let productView = async (req, res) => {

    let productData = await productModel.find({ productStatus: true })
    let staticPath = process.env.PRODUCTPATH



    if (productData) {

        let obj = {
            status: 1,
            msg: "all product viewed",
            productData,
            staticPath

        }
        res.send(obj)
    }
    else {
        let obj = {
            status: 0,
            msg: "No data found",

        }
        res.send(obj)

    }

}


let deleteProduct = async (req, res) => {

    let { id } = req.params

    let obj;

    if (id) {

        await productModel.deleteOne({ _id: id })

        obj = {
            status: 1,
            msg: "deleted"

        }
        res.send(obj)
    }

    else {

        obj = {
            status: 0,
            msg: "no id"

        }
        res.send(obj)


    }


}















module.exports = { parentCategoryData, getSubCategoryData, getSubSubCategoryData, getMaterial, getColor, savedata, productView, deleteProduct }
