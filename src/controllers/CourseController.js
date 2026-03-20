const courseSchema = require("../models/CourseModel")
const uploadToCloudinary = require("../utils/Cloudinary")

const createCourse = async(req,res) =>{
    try{
        //to access file path
        // console.log("file...",req.file)
        
        // const savedCourse = await courseSchema.create(req.body)
        // const savedCourse = await courseSchema.create({...req.body,imagePath:req.file.path})
        
        const cloudinaryResponse = await uploadToCloudinary(req.file.path)
        // console.log("cloudinaryResponse",cloudinaryResponse) // to ye ek secure_url return karta hai

        const savedCourse = await courseSchema.create({...req.body,imagePath:cloudinaryResponse.secure_url})
        
        // if else... likhna ho to likh sakte hai..
        res.status(201).json({
            message:"course created...",
            data:savedCourse
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            message:"error while creating course...",
            err:error
        })
    }
}

const getAllCourses = async(req,res)=>{
    try{

        // const courses = await courseSchema.find({status:"active"})
        const courses = await courseSchema.find({status:"active"}).populate("categoryId") // colum name 
        res.status(200).json({
            message:"fetch all courses...",
            data:courses
        })

    }catch(error){
        res.status(500).json({
            message:"error while fetch all courses....",
            err:error
        })
    }
}


module.exports = {
    createCourse,
    getAllCourses
}