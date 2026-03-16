const router = require("express").Router()
const courseController = require("../controllers/CourseController")
const testMiddleware = require("../middleware/TestMiddleware")
const uploadMiddleware = require("../middleware/UploadMiddleware")


router.post("/course",uploadMiddleware.single("image"),courseController.createCourse)
router.get("/getallcourses",testMiddleware,courseController.getAllCourses)

module.exports = router