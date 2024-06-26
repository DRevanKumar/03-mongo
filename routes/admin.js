const express  = require("express");
const adminMiddleware = require("../middleware/admin");
const { Course } = require("../db");
const router = express.Router();
const { Admin }=require("../db")

// Admin Routes
router.post('/signup',async  (req, res) => {
    const username=req.body.username
    const password=req.body.password

    await Admin.create({
        username,
        password
    })

    res.json({
        msg:"Admin created successfully"
    })



});

router.post('/courses', adminMiddleware, async (req, res) => {
   
    const title=req.body.title;
    const description=req.body.description;
    const imagelink=req.body.imagelink;
    const price=req.body.price;

    let newCourse=await Course.create({
        title,
        description,
        imagelink,
        price
    })

    res.json({
        msg:"Course created succesfully",CourseID:newCourse._id
    })


});

router.get('/courses', adminMiddleware,async  (req, res) => {
    // Implement fetching all courses logic
    let response= await Course.find({})

    res.json({
        Courses:response
    })

});

module.exports = router;