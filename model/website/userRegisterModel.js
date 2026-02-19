let mongoose = require("mongoose")
let userRegistrationSchema = mongoose.Schema({

    userName: {
        required: true,
        type: String,

    },

    userEmail: {
        required: true,
        type: String,
        unique: true,

    },

    userPhone: {
        // required: true,
        type: String,  // Yes, String me letters aa sakte hain — but easily roka ja sakta hai.
        match: [/^[0-9]{10}$/, "Phone number must be 10 digits"]

    },

    userPassword: {
        // required: true,
        type: String,
        default: null

    },
    userAddress: {
        type: String,
        default: ""
    },
    userTitle: {
        type: String,
        enum: ["mr", "mrs"],  //  restrict title values (best practice) // value decided hai isiliye default me 1 value dena para because of google login
        default: "mr"
    }

})

let userRegisterModel = mongoose.model("userRegister", userRegistrationSchema)

module.exports = { userRegisterModel }