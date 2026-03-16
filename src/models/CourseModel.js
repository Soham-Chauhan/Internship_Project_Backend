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
    status:{
        type:String,
        default:"active", 
        enum:["active","inactive"]
    },
    
    // reference key (foreign key)
    categoryId:{
        type:mongoose.Types.ObjectId,
        ref:"category" // table name (check in category model name must pass here to bind relation )
    },
    imagePath:{
        type:String
    }

    // multiple reference key de sakate hai ek model me 
    // subCategoryId:{
    //     type:mongoose.Types.ObjectId,
    //     ref:"subcategory"
    // }
   
})

module.exports = mongoose.model("course",courseSchema)