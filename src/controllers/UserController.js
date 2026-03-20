const userSchema = require("../models/UserModel")
const bcrypt = require("bcrypt")
const mailSend = require("../utils/MailUtils")

// jwt token 
const jwt = require("jsonwebtoken")
const secret = "secret"

const registerUser = async(req,res)=>{
    
    try{
        // const {firstName,lastName,email,password} = req.body  ese nahi karna
        // console.log(req.body)

        const hashedPassword = await bcrypt.hash(req.body.password,10) 

        // const savedUser = await userSchema.create(req.body)
        const savedUser = await userSchema.create({...req.body,password:hashedPassword})

        await mailSend(savedUser.email,"Welcome to our app, Thank you for registering with our app...")    // jese hi user register hota hai vese hi use welcome mail bhejne ke liye
         
        res.status(201).json({
            message:"user created sucessfully",
            data:savedUser
        })

    }catch(err){
        console.log(err)
        res.status(500).json({
            message:"error while creating user...",
            err:err
        })
    }
}

const loginUser = async(req,res)=>{
    try{
        // select * from users where email =? --> userObj
        //userObj.password[encrypted] --> req.body --> plain password 
        // compare() using bcrypt

        const {email,password} = req.body // req.body.email and password

        // const foundUserFromEmail = await userSchema.findOne({mdoelColumnName:req.body.email})
        const foundUserFromEmail = await userSchema.findOne({email:email})
        console.log(foundUserFromEmail)

        if(foundUserFromEmail){
            //password compare
            const isPasswordMatched = await bcrypt.compare(password,foundUserFromEmail.password)

            //..if password compare it will return true else if return false
            
            if(isPasswordMatched){

                // token generated...
                const token = jwt.sign(foundUserFromEmail.toObject(),secret)
                // const token = jwt.sign({id:foundUserFromEmail._id},secret)
                res.status(200).json({
                    message:"Login Succesfully",
                    // data:foundUserFromEmail,
                    token:token,
                    role:foundUserFromEmail.role
                })
            }
            else{
                // unauthorized...
                res.status(401).json({
                    message:"Invalid Password"
                })
            }
        }
        else{
            res.status(404).json({
                message:"User Not Found"
            })
        }
    }
    catch(err){
        console.log("error : ", err)
        res.status(500).json({
            messagae:"error while login user",
            err:err
        })
    }
}

module.exports = {
    registerUser,
    loginUser
}