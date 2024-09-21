const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Types.ObjectId;



const User = new Schema({
    email: {type: String, unique: true},
    password: String,
    fname: String,
    lname: String,
});

const Admin = new Schema({
    email: {type: String, unique: true},
    password: String,
    fname: String,
    lname: String,
});


const Course = new Schema({
    title: String,
    description: String,
    price: Number,
    imageUrl: String,
    creatorId: ObjectId,
});

const Purchase = new Schema({
    courseId: ObjectId,
    userId: ObjectId,
});

const CourseModel = mongoose.model('course', Course);
const UserModel = mongoose.model('user', User);
const AdminModel = mongoose.model('admin', Admin);
const PurchaseModel = mongoose.model('purchase', Purchase);


module.exports = {
    CourseModel,
    UserModel,
    AdminModel,
    PurchaseModel
}