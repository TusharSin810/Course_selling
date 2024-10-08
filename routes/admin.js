const {Router} = require("express");
const {AdminModel, CourseModel} = require("../db");
const {bcrypt}= require('bcrypt');
const {z} = require('zod');
const {JWT_SECRET_ADMIN} = require('../config');
const {Adminauth} = require('../middleware/Adminauth')

const adminRouter = Router();

adminRouter.post('/signin', async (req,res) =>{
       const email = req.body.email;
    const password = req.body.password;

    const user = await AdminModel.findOne({
        email: email
    })

    if(!user){
        res.status(403).json({
            message: "User Does not Exist Please signin"
        })
        return
    }

    const passMatch = await bcrypt.compare(password,user.password);
    

    if(passMatch){
        const token = jwt.sign({
            id:user._id.toString()
    },JWT_SECRET_ADMIN)
        res.json({
            token:token
        })
    }else{
        res.status(403).json({
            message:"Innorect Credentials"
        })
    }
});

adminRouter.post('/signup', async (req,res) =>{
        const requiredBody = z.object({
        email: z.string().email(),
        lname: z.string(),
        fname: z.string(),
        password: z.string()
    })
    
    const parseSuccess = requiredBody.safeParse(req.body);
    
    if(!parseSuccess.success){
        res.json({
            error: parseSuccess.error.message,
        })
        return
    }
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    let errthrown = false;

    try{
        const hashpass = await bcrypt.hash(password,10);
        console.log(hashpass);

        await AdminModel.create({
            email: email,
            password: hashpass,
            name: name
        })
    }catch(e){
        res.json({
            message:"User already Exists"
        })
        errthrown = true;
    }
    if(!errthrown){
        res.json({
            message:"You are logged In"
        })
    }
});

adminRouter.post('/course',Adminauth,async (req,res) =>{
    const adminId = req.userId;
    const{title, description, imageUrl, price} = req.body;

    const course = await CourseModel.create({
        title:title,
        description: description, 
        imageUrl: imageUrl, 
        price: price, 
        creatorId: adminId
    })

    res.json({
       message: "Course created",
       courseId: course._id
    })

});

adminRouter.put('/course',Adminauth,async (req,res) =>{
    const adminId = req.userId;
    const{title, description, imageUrl, price} = req.body;

    const course = await CourseModel.updateOne({
        _id:courseId,
        creatorId: adminId
    },{
        title:title,
        description: description, 
        imageUrl: imageUrl, 
        price: price,  
})  
    res.json({
        message: "Course updated",
        courseId: course._id
    })

});

adminRouter.put('/course/bulk',async (req,res) =>{

    const adminId = req.userId;
    const courses = await courseModel.find({
        creatorId: adminId 
    });

    res.json({
        message: "Course updated",
        courses
    })
});

module.exports = {
    adminRouter:adminRouter
}
