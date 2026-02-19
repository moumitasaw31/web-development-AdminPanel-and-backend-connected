const mongoose = require("mongoose")

const colorSchema = mongoose.Schema({

  colorName: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 15,
    unique: true
  },

  colorCode: {
    type: String,
    required: true,
    // match: /^#([0-9A-F]{3}){1,2}$/i
  },

  colorOrder: {
    type: Number,
    required: true
    // unique: true  // optional (business rule)
  },

  colorStatus: {
    type: Boolean,
    default: true
  }

})

const colorModel = mongoose.model("color", colorSchema)
module.exports = colorModel
