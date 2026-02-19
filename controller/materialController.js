const materialModel = require("../model/materialModel")

let viewMaterial = async (req, res) => {

    let skip = 0
    let limit = 5

    if (req.query.page) {
        skip = (req.query.page - 1) * limit
    }

    try {

        let getAllMaterial = await materialModel.find().skip(skip).limit(limit)

        let getMaterial = await materialModel.find()

        let getLength = getMaterial?.length || 0

        let obj = {
            status: 1,
            msg: "material viewed",
            getAllMaterial,
            totalPages: Math.ceil(getLength / limit)
        }

        return res.status(200).send(obj)

    }
    catch (err) {
        console.log(err)
        let obj = {
            status: 0,
            msg: "failed",
            err
        }
        return res.status(400).send(obj)
    }


}

let add = async (req, res) => {

    let receivedData = req.body

    console.log(req.body)

    let obj

    try {

        let SendData = await materialModel.create(receivedData)

        obj = {
            status: 1,
            msg: "material Added",
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

        return res.status(400).send(obj)


    }

}

let deleteData = async (req, res) => {
    let obj
    try {
        let { id } = req.params


        if (!id) {                               // lengthy code

            obj = {
                status: 0,
                msg: "id not found"
            }
            return res.status(400).json(obj)
        }



        let delData = await materialModel.deleteOne({ _id: id })

        if (!delData)                                                       //  short cut // optimised style

            return res.status(404).json({ status: 0, msg: "Not found" })

        return res.status(200).json({ status: 1, msg: "data deleted" })




    }
    catch (err) {

        console.log(err)

        obj = {
            status: 0,
            msg: "server error",

        }

        if (err.name === "CastError") {         //  agar casterror na aaya toh 

            obj.msg = 'Invalid id'


        }



        return res.status(400).json(obj)

    }



}

let multiDelete = async (req, res) => {

    try {
        let { ids } = req.body

        if (!ids) return res.status(400).json({
            status: 0,
            msg: "ids not found "
        })

        let delIds = await materialModel.deleteMany({ _id: {$in: ids} })     // delete where _id is IN this array

        let obj = {
            status: 1,
            msg: "multi data deleted",
            delIds
        }

        return res.json(obj)

    }
    catch (err) {

        let obj = {
            status: 0,
            msg: "something went wrong",
            
        }
        return res.status(400).json(obj)
    }

}


module.exports = { viewMaterial, add, deleteData, multiDelete }

//http://localhost:8000/admin/material/view