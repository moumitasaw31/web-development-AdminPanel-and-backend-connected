const { categoryModel } = require("../model/categoryModel")
const { subcategoryModel } = require("../model/subcategoryModel")


let addSubCategory = async (req, res) => {


    try {

        // let subcategoryobj = {                            // never copy directly
        //     parentCategory: req.body.parentCategory,
        //     subCategoryName: req.body.subCategoryName,
        //     subCategoryOrder: Number(req.body.subCategoryOrder),
        //     subCategoryStatus: req.body.subCategoryStatus === "true",
        //     subCategoryImage: req.body.
        // }

        let subcategoryobj = { ...req.body }

        if (req.file) {
            if (req.file?.filename)
                subcategoryobj.subCategoryImage = req.file.filename
        }

        let SendData = await subcategoryModel.create(subcategoryobj)

        return res.status(200).send({
            status: 1,
            msg: "Subcategory Added",
            SendData
        })

    } catch (err) {

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




let viewSubCategory = async (req, res) => {

    let skip = 0
    let limit = 5

    if (req.query.page) {
        skip = (req.query.page - 1) * limit
    }

    try {

        let viewData = await subcategoryModel.find().skip(skip).limit(limit).populate("parentCategory","categoryName")

        let getData = await subcategoryModel.find()
        let datalenght = getData.length

        obj = {
            status: 1,
            msg: "subcategory viewed",
            viewData,
            staticPath: process.env.SUBCATEGORYPATH,
            totalPages: Math.ceil(datalenght / limit)

        }

        res.send(obj)

    }
    catch (err) {

        obj = {
            status: 0,
            msg: "something went wrong",

        }

        res.send(obj)


    }



}

let categoryView = async (req, res) => {

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

let deleteSubCategory = async (req, res) => {


    let { id } = req.params

    if (!id) return res.send({ msg: "id not found" })

    try {

        let delData = await subcategoryModel.deleteOne({ _id: id })

        if (!delData) return res.status(400).send({ msg: "data not found" })
        let obj = {
            status: 1,
            msg: " Subcategory Deleted",
            delData

        }
        res.send(obj)


    }

    catch (err) {

        let obj = {
            status: 0,
            msg: " something went wrong",

        }

        if (err.name === "CastError")
            msg = "Invalid ID"

        else
            msg = "Delete failed"

        res.send(obj)


    }



}


let multiDeleteSubCategory = async (req, res) => {

    let { ids } = req.body

    if (!ids || ids.length === 0) return res.status(404).send({ msg: "id not provided" })

    try {

        let delData = await subcategoryModel.deleteMany({ _id: { $in: ids } })

        if (delData.deletedCount === 0)
            return res.status(404).send({ msg: "Data not found" })

        let obj = {
            status: 1,
            msg: " multi Sub-category Deleted",
            delData

        }
        res.send(obj)


    }

    catch (err) {

        let obj = {
            status: 0,
            msg: " something went wrong",

        }

        if (err.name === "CastError") {
            obj.msg = "Invalid ID"

        }


        else
            obj.msg = "Delete failed"

        res.send(obj)


    }


}

let updateSubCategory = async (req, res) => {



}

module.exports = { addSubCategory, viewSubCategory, deleteSubCategory, multiDeleteSubCategory, updateSubCategory, categoryView }