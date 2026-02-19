const colorModel = require("../model/colorModel")

let viewColor = async (req, res) => {

  let skip = 0
  let limit = 5

  if(req.query.page){
    skip= (req.query.page-1)*limit
  }

  try {

    let getAllData = await colorModel.find().skip(skip).limit(limit)

    let allData = await colorModel.find()

    let dataLength=allData.length

  
    let obj = {
      status: 1,
      msg: "color viewed",
      dataLength,
      totalPages: Math.ceil(dataLength/limit),
      getAllData
    }
    res.send(obj)

  }

  catch (err) {

    console.log(err)

    let obj = {
      status: 0,

    }


    res.send(obj)


  }
}





let addColor = async (req, res) => {

  let colordata = req.body

  console.log(colordata)

  try {

    let dataAddedRes = await colorModel.insertOne(colordata)

    let obj = {
      status: 1,
      msg: " color added",
      dataAddedRes
    }

    res.send(obj)

  }
  catch (err) {

    if (err.code === 11000) {

      let obj = {
        status: 0,
        msg: "Color name already exists",

      }
      return res.status(400).send(obj)

    }

    if (err.name === "CastError") {   // value type handle
      let obj = {
        status: 0,
        msg: "must be number value",

      }
      return res.status(400).send(obj)

    }

    if (err.name === "ValidationError") {   //empty field handle
      let obj = {
        status: 0,
        msg: "field is empty",

      }
      return res.status(400).send(obj)

    }

    let obj = {                    // technical handle
      status: 0,
      msg: "server error",

    }
    return res.status(500).send(obj)

  }



}



// let addColor = async (req, res) => {
//   try {
//     let dataAddedRes = await colorModel.create(req.body)

//     res.send({
//       status: 1,
//       msg: "Color added",
//       dataAddedRes
//     })

//   } catch (err) {

//     //  number / type error
//     if (err.name === "CastError") {
//       return res.status(400).send({
//         status: 0,
//         msg: "Order must be a number"
//       })
//     }

//     //  required / schema validation
//     if (err.name === "ValidationError") {
//       return res.status(400).send({
//         status: 0,
//         msg: err.message
//       })
//     }

//     // fallback
//     res.status(500).send({
//       status: 0,
//       msg: "Server error"
//     })
//   }
// }


let updateOneColor = async (req, res) => {
  let { id } = req.params
  let objres

  if (!id) {
    objres = {

      status: 0,
      msg: " id is not defined"
    }

    return res.status(400).send(objres)

  }
  

  try {

    let updateData = await colorModel.updateOne(
      { _id: id },
      { $set: req.body }
    )

    let obj ={
      status:1,
      msg: "Data Updated",
      updateData
    }

    return res.send(obj)

  }

  catch (err) {

    let obj ={
      status:0,
      msg: "server error",
      err
    }
    return res.status(500).send(obj)

  }
}

let deleteColor = async (req, res) => {       // 1 list delete

  let { id } = req.params

  let obj

  try {

    let delRes = await colorModel.deleteOne({ _id: id })

    obj = {
      status: 1,
      msg: "One color deleted",
      delRes
    }
    res.send(obj)

  }
  catch (err) {

    obj = {
      status: 0,
      err
    }
    res.send(obj)


  }

}

let multiDelete = async (req, res) => {

  let { ids } = req.body
  let obj

  try {
    let delRes = await colorModel.deleteMany({ _id: ids })
    obj = {
      status: 1,
      msg: "multi color deleted",
      delRes
    }
    res.send(obj)
  }
  catch (err) {

    if (err.name === "CastError") {

      obj = {
        status: 0,
        msg: "select checkbox"
      }
      return res.status(400).send(obj)

    }




  }

}


module.exports = { viewColor, addColor, updateOneColor, deleteColor, multiDelete }