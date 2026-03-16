const router = require("express").Router()
const categoryController = require("../controllers/CategoryController")

router.post("/category",categoryController.createCategory)
router.get("/getcategories",categoryController.getAllCategories)

module.exports = router