const jwt = require("jsonwebtoken");
const dotenv = require('dotenv'); 

dotenv.config();

const JWT_SECRET_USER = process.env.JWT_SECRET_USER;
const JWT_SECRET_ADMIN = process.env.JWT_SECRET_ADMIN;

function Userauth(req, res, next) {
    const token = req.headers.authorization;

    const response = jwt.verify(token, JWT_SECRET_USER);

    if (response) {
        req.userId = response.id;
        next();
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
}

function Adminauth(req, res, next) {
    const token = req.headers.authorization;

    const response = jwt.verify(token, JWT_SECRET_ADMIN);

    if (response) {
        req.userId = response.id;
        next();
    } else {
        res.status(403).json({
            message: "Incorrect creds"
        })
    }
}

module.exports = {
    Userauth,
    Adminauth,
    JWT_SECRET_USER,
    JWT_SECRET_ADMIN
};