const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { Course } = require("../db");
const { User } = require("../db");

// User Routes
router.post('/signup', async (req, res) => {
    const username=req.body.username
    const password=req.body.password

    await User.create({
        username,
        password
    })
    res.json({
        msg:"User created successfully"
    })

});

router.get('/courses', async (req, res) => {
    let response = await Course.find({})
    res.json({
        Courses: response
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
    // Implement course purchase logic
    const courseId=req.params.courseId
    const username=req.headers.username
    await User.updateOne({
        username:username
    },{
        "$push":{
            courses:courseId
        }

    })
    res.json({
        msg:"purchase succesfull"
    })

});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    const username=req.headers.username
    const user = await User.findOne({
        username:username
    })
    const Courses= await Course.find({
        _id:{
            "$in":user.courses
        }

    })
    res.json({
       courses: Courses
    })
});

module.exports = router