const jwt = require("jsonwebtoken");
const {JWT_SECRET_USER} = require('../config');


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

module.exports = {
    Userauth,
};