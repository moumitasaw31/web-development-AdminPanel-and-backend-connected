let mongoose = require("mongoose")
let subcategorySchema = mongoose.Schema({


     subCategoryImage: {
        type: String,
        required: true,
        
    },

    subCategoryName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^[A-Za-z ]+$/]

    },
   
    subCategoryOrder: {
        type: Number,
        required: true,

    },

    parentCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "category",               // database table ka name    
        required: true,


    },
    subCategoryStatus:{
        type: Boolean,
        default:true,
    },
    

})

let subcategoryModel = mongoose.model("subcategory", subcategorySchema)
module.exports = {subcategoryModel}