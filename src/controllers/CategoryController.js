const categorySchema = require("../models/CourseCategoryModel")

const createCategory = async(req,res) =>{
    try{
        
        const savedCategory = await categorySchema.create(req.body)
        
        // if else... likhna ho to likh sakte hai..
        res.status(201).json({
            message:"category created...",
            data:savedCategory
        })
    }catch(error){
        res.status(500).json({
            message:"error while creating category",
            err:error
        })
    }
}

const getAllCategories = async(req,res)=>{
    try{

        const categories = await categorySchema.find({status:"active"})
        res.status(200).json({
            message:"fetch all categories...",
            data:categories
        })

    }catch(error){
        res.status(500).json({
            message:"error while fetch all categories....",
            err:error
        })
    }
}
module.exports ={
    createCategory,
    getAllCategories
}