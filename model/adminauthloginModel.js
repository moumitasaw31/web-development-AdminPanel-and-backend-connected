let mongoose = require("mongoose")
let adminauthLoginSchema = mongoose.Schema({

    userEmail: {
        type: String,
        required: [true, "User Email is required"]
    },
    userPassword: {
        type: String,
        required: [true, "User Email is required"]
    },
})

let adminauthLoginModel = mongoose.model("admin-auth", adminauthLoginSchema)

module.exports = { adminauthLoginModel }