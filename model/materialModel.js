let mongoose= require("mongoose")
let materialSchema= mongoose.Schema({


    categoryName:{
        type: String,
        required: true,
        unique: true,
        match: [/^[A-Za-z]+$/]
    },
    categoryOrder:{
        type: Number,
        required: true,

    }
})

let materialModel= mongoose.model("material",materialSchema)
module.exports=materialModel