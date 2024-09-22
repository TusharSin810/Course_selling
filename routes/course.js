const {Router} = require("express")
const {Userauth} = require("../middleware/Userauth");
const { PurchaseModel, CourseModel } = require("../db");
const courseRouter = Router();

courseRouter.post('/purchase',Userauth, async (req,res) =>{
    const userId = req.userId;
    const courseId = req.body.courseId;

    await PurchaseModel.create({
        userId,
        courseId
    })
    res.json({
        message: "course Purchased Successfully"
    })

});

courseRouter.get('/preview', async (req,res) => {
    const courses = await CourseModel.find({})
    res.json({
        message:"These Are all the avaliable courses",
        courses
    })
});

module.exports = {
    courseRouter:courseRouter
}