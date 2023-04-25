const jwt = require("jsonwebtoken");
const { createError } = require("../utils/createError")

exports.auth = async (req, res, next) => {
    try {
        const {authtoken} = req.cookies;
        if(!authtoken){
            return next(createError(401,'user not logged'));
        }
        const decoded = await jwt.decode(authtoken, process.env.JWT_SECRET);
        if(!decoded){
            return next(createError(403, 'token is invalid'));
        }

        req.userId = decoded.id;
        next();

    } catch (error) {
        next(createError());
    }
}