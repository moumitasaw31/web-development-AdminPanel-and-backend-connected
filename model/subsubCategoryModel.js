let mongoose = require("mongoose")
let subsubcategorySchema = mongoose.Schema({


     subsubCategoryImage: {
        type: String,
        required: true,
        
    },

     parentCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "category",               // database table ka name    
        required: true,


    },

    subCategoryName: {

        type:mongoose.Schema.Types.ObjectId,
        ref: "subcategory",               // database table ka name    
        required: true,


    },

    subsubCategoryName: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        match: [/^[A-Za-z ]+$/]

    },
   
    subsubCategoryOrder: {
        type: Number,
        required: true,

    },

   
    subCategoryStatus:{
        type: Boolean,
        default:true,
    },
   
    

})

let subsubcategoryModel = mongoose.model("sub-subcategory", subsubcategorySchema)
module.exports = {subsubcategoryModel}