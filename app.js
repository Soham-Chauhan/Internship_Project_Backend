const express = require("express")
const app = express()
const cors = require("cors")
// load env file...
// const dotenv = require("dotenv")
// dotenv.config()

// second method
require("dotenv").config()
app.use(express.json()) // ye likhna jaruri hai nahi to jab post api call karenege to req.body me undefined hi jayenga data nahi jayenga

app.use(cors()) // allow all request

// database connection
const DBConnection = require("./src/utils/DBConnection")
DBConnection()

//routes
const userRoutes = require("./src/routes/UserRoute")
app.use("/user",userRoutes)

// const PORT = 3000
const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`server started on port ${PORT}`)
})