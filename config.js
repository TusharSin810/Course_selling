const dotenv = require('dotenv'); 

dotenv.config();


const JWT_SECRET_USER = process.env.JWT_SECRET_USER;
const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN;
const MONGODB_URI = process.env.MONGODB_URI;


module.exports = {
    JWT_SECRET_ADMIN,
    JWT_SECRET_USER,
    MONGODB_URI
}