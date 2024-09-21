const express = require("express")
const jwt = require("jsonwebtoken")
const {userRouter} = require("./routes/user")
const { courseRouter } = require("./routes/course")


const app = express();
const port = 3000;






app.listen(port ,() => {
    console.log(`Listening on Port ${port}`)
});