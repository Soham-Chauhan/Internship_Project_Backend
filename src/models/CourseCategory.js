const mongoose = require("mongoose")
const Schema = mongoose.Schema

const categorySchema = new Schema({
    categoryName:{
        type:String,
        required:true
    },
    status:{
        type:String,
        default:"active",
        enum:["active","inactive"]
    }
})

module.exports = mongoose.model("category",categorySchema)