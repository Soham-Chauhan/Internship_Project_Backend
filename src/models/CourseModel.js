const mongoose = require("mongoose")
const Schema = mongoose.Schema

const courseSchema = new Schema({
    courseName:{
        type:String,
        required:true
    },
    courseDetail:{
        type:String,
        required:true
    },
    coursePrice:{
        type:Number
        
    },
    // reference key (foreign key)
    categoryId:{
        type:mongoose.Types.ObjectId,
        ref:"category" // table name (check in category model name must pass here to bind relation )
    },

    // multiple reference key de sakate hai ek model me 
    // subCategoryId:{
    //     type:mongoose.Types.ObjectId,
    //     ref:"subcategory"
    // }
   
})

module.exports = mongoose.model("course",courseSchema)