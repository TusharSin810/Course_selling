const {Router} = require("express");

const userRouter = Router();

userRouter.post('/signin',(req,res) =>{

});

userRouter.post('/signup',(req,res) =>{

});

userRouter.get('/purchases', (req,res) => {

});

module.exports = {
    userRouter:userRouter
}