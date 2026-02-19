let mongoose = require("mongoose")
let categorySchema = mongoose.Schema({


    categoryName: {
        type: String,
        required: true,
        unique: true,
        match: [/^[A-Za-z ]+$/]

    },
    categoryImage: {
        type:String,
        required: true,
        
    },
    categoryOrder: {
        type: Number,
        required: true,

    },
    categoryStatus:{
        type: Boolean,
        default:true,
    }
})

let categoryModel = mongoose.model("category", categorySchema)
module.exports = {categoryModel}