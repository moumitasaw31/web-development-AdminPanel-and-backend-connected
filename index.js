const express = require("express")
let mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const { adminRoutes } = require("./routes/Admin/adminRoutes")
const { adminauthLoginModel } = require("./model/adminauthloginModel")
const { webRoutes } = require("./routes/website/webRoute")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/admin", adminRoutes)


app.use("/uploads/category", express.static("uploads/category"))
app.use("/uploads/subCategory", express.static("uploads/subCategory"))
app.use("/uploads/subsubCategory", express.static("uploads/subsubCategory"))
app.use("/uploads/product", express.static("uploads/product"))



app.use("/web", webRoutes)







// console.log("before db connecte")

mongoose.connect(process.env.DBCONNECTION)
  .then(async () => {

    let insertUser = await adminauthLoginModel.find()       //  1 array hai // jo para hai utha k laya

    if (insertUser.length === 0) {

      await adminauthLoginModel.create({

        userEmail: process.env.userEmail,
        userPassword: process.env.userPassword
      })
    }



    app.listen(process.env.PORT, () => {
      console.log("Server started on port", process.env.PORT)
    })

  })
  .catch((err) => {
    console.log("Server error")
  })
