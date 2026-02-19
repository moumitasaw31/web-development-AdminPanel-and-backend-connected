const { categoryModel } = require("../model/categoryModel")

let add = async (req, res) => {

    let categoryobj = { ...req.body }  // 1 object hai

    console.log(req.body)
    console.log(req.file)

    let obj

    if (req.file) {
        if (req.file.filename) {
            categoryobj.categoryImage = req.file.filename
        }
    }


    try {

        let SendData = await categoryModel.create(categoryobj)

        obj = {
            status: 1,
            msg: " category Added",
            SendData
        }

        return res.status(200).send(obj)


    }

    catch (err) {

        console.error(err)

        let obj = {

            status: 0,
            msg: "Server Error",

        }


        if (err.name === "ValidationError") {

            obj.msg = "Check field value"

        }
        else if (err.code === 11000) {
            obj.msg = "Value Already Exits "

        }
        else if (err.name === "castaError") {
            obj.msg = "Invalid data type"
        }

        return res.status(400).send(obj)


    }

}

let viewCategory = async (req, res) => {

    let skip = 0
    let limit = 5

    if (req.query.page) {
        skip = (req.query.page - 1) * limit
    }

    try {

        let viewData = await categoryModel.find().skip(skip).limit(limit)

        let getData = await categoryModel.find()
        let datalenght = getData.length

        obj = {
            status: 1,
            msg: " category viewed",
            viewData,
            staticPath: process.env.CATEGORYPATH,
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


let deleteCategory = async (req, res) => {


    let { id } = req.params

    if (!id) return res.send({ msg: "id not found" })

    try {

        let delData = await categoryModel.deleteOne({ _id: id })

        if (!delData) return res.status(400).send({ msg: "data not found" })
        let obj = {
            status: 1,
            msg: " category Deleted",
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


let multiDeleteCategory = async (req, res) => {

    let { ids } = req.body

    if (!ids || ids.length === 0) return res.status(404).send({ msg: "id not provided" })

    try {

        let delData = await categoryModel.deleteMany({ _id: { $in: ids } })

        if (delData.deletedCount === 0)
            return res.status(404).send({ msg: "Data not found" })

        let obj = {
            status: 1,
            msg: " multi category Deleted",
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

let updateCategory = async (req, res) => {



}

module.exports = { add, viewCategory, deleteCategory, multiDeleteCategory, updateCategory }