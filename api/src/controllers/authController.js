const User = require('../models/User');
const { createError } = require('../utils/createError');
const cloudinary = require('cloudinary').v2;

exports.signup = async (req, res, next) => {
    try {
        const {username, email, avatar} = req.body;

        let user = await User.findOne({email});

        if(user){
            return next(createError(400, 'Email already exist'));
        }
        user = await User.findOne({username});
        if(user){
            return next(createError(400, 'Username is not available'))
        }

        if(!avatar){
            return next(createError(400, 'avatar is required'))
        }

        if(avatar){
            const img = await cloudinary.uploader.upload(avatar, {
                folder: 'blogs/users'
            }) ;
            if(!img){
                return next(createError());
            }
            req.body.avatar = img;
        }
        
        const newUser = await User.create({...req.body});

        const token = await newUser.getJWTToken();

        res.cookie('authtoken', token, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            secure: true,
            sameSite: 'none'
        }).send({
            success: true,
            message:'Signup successfully',
            token,
            user
        });

    } catch (error) {
        next(createError())
    }
}

exports.login = async (req, res, next) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email}).select('+password');

        if(!user){
            return next(createError(400, 'Wrong creditials'));
        }
        
        const equalPassword = await user.comparePassword(password);
        if(!equalPassword){
            return next(createError(400, 'Wrong creditials'));
        }

        const token = await user.getJWTToken();

        res.cookie('authtoken', token, {
            maxAge: 30 * 24 * 60 * 60 * 1000,
            secure: true,
            sameSite: 'none'
        }).send({
            success: true,
            message:'Login successfully',
            token,
            user
        });  

    } catch (error) {
        next(createError());
    }
}

exports.logout = async (req, res, next) => {
        res.cookie('authtoken', '', {
            maxAge: 0,
            secure: true,
            sameSite: 'none'
        }).send({
            success: true,
            message:'Logout successfully'
        });  
}
