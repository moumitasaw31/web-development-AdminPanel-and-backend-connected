let mongoose = require("mongoose")
let productSchema = mongoose.Schema({

    productImage: {
        type: String,
        required: true,
    },

    backImage: {

        type: String,
        required: true

    },
    galleryImage: {
        type: Array,

    },
    description: {
        type: String,
        required: true
    },

    prodctName: {
        type: String,
        required: true,
    },
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true
    },
    subCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "subcategory",
        required: true
    },
    subsubCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sub-subcategory",
        required: true
    },
    material: [{                                     //  material category se data ayega
        type: mongoose.Schema.Types.ObjectId,
        ref: "material",
        required: true,

    }],
    color: [{                                     //  material category se data ayega
        type: mongoose.Schema.Types.ObjectId,
        ref: "color",
        required: true,

    }],
    productType: {
        type: String,
        enum: ["Featured", "New Arrivals", "Onsale"],
        default: "Featured"

    },
    bestSelling: {
        type: Boolean,
    },
    topRated: {
        type: Boolean,
    },
    upsell: Boolean,
    actualPrice: Number,
    salePrice: Number,
    totalInStocks: Number,
    Order: Number,
    productStatus: {
        type: Boolean,
        default: true
    }


})


let productModel = mongoose.model("product", productSchema)

module.exports = { productModel }