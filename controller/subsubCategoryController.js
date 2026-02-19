const { categoryModel } = require("../model/categoryModel")
const { subcategoryModel } = require("../model/subcategoryModel")
const { subsubcategoryModel } = require("../model/subsubCategoryModel")

// parentCategory = async (req, res) => {

//     try {
//         let parentCategoryData = await categoryModel.find({ status: true }).select("categoryName")
//         let obj = {

//             status: 1,
//             msg: "data viewed",
//             parentCategoryData
//         }

//         res.send(obj)

//     }
//     catch (err) {

//         let obj = {

//             status: 0,
//             msg: "something went wrong",
//             err
//         }

//         res.send(obj)

//     }


// }

let parentCategory = async (req, res) => {

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

        let obj = {
            status: 0,
            msg: "something went wrong",

        }

        res.send(obj)


    }

}

let subCategory = async (req, res) => {                // need data according parentCategory

    let { parentid } = req.params                     //  status active + id match


    try {
        let subgoryData = await subcategoryModel.find({ subCategoryStatus: true, parentCategory: parentid }).select("subCategoryName")
        let obj = {

            status: 1,
            msg: "data viewed",
            subgoryData
        }

        res.send(obj)

    }
    catch (err) {

        let obj = {

            status: 0,
            msg: "something went wrong",
            err
        }

        res.send(obj)

    }

}

let savedata = async (req, res) => {

    let subsubData = { ...req.body }
    if (req.file.filename) {
        subsubData["subsubCategoryImage"] = req.file.filename
    }

    try {
        let subsubCatData = await subsubcategoryModel.create(subsubData)


        let obj = {

            status: 1,
            msg: "data save to Database",
            subsubCatData
        }

        res.send(obj)

    }

    catch (err) {

        console.error(err)

        let obj = { status: 0, msg: "Server Error" }

        if (err.name === "ValidationError")
            obj.msg = "Missing or wrong field"

        else if (err.code === 11000)
            obj.msg = "Value already exists"

        else if (err.name === "CastError")
            obj.msg = "Invalid data type"

        return res.status(400).send(obj)
    }


}
let viewsubsub = async (req, res) => {

    let skip = 0
    let limit = 5

    if (req.query.page) {
        skip = (req.query.page - 1) * limit
    }


    try {
        let getSubSubData = await subsubcategoryModel.find().skip(skip).limit(limit).populate("parentCategory", "categoryName").populate("subCategoryName", "subCategoryName")

        let getData = await subsubcategoryModel.find()
        let totalPages = Math.ceil(getData.length/limit)
        let staticPath = process.env.SUBSUBCATEGORYPATH
        
        let obj = {

            status: 1,
            msg: "View Sub Sub CategoryData",
            getSubSubData,
            staticPath,
            totalPages
        }

        res.send(obj)

    }
    catch (err) {
        let obj = {

            status: 0,
            msg: "server Error",

        }

        res.send(obj)
    }



}
module.exports = { parentCategory, subCategory, savedata, viewsubsub }