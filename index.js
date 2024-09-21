const express = require("express")
const jwt = require("jsonwebtoken")
const {userRouter} = require("./routes/user")
const { courseRouter } = require("./routes/course")
const {adminRouter} = require("./routes/admin")
const dotenv = require("dotenv");

dotenv.config({path:'./env'});

const app = express();
const port = 3000;


app.use("/api/v1/user", userRouter)
app.use("/api/v1/course", courseRouter)
app.use("/api/v1/admin", adminRouter)


async function main() {
    await mongoose.connect(process.env.MONGODB_URI)
        .then(() => console.log('Database connected'))
        .catch((err) => console.log('Database connection error:', err));
    
    app.listen(port ,() => {
    console.log(`Listening on Port ${port}`)
    });    
}

main();