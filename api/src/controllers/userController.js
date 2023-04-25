const Post = require("../models/Post");
const User = require("../models/User");
const { createError } = require("../utils/createError")
const cloudinary = require('cloudinary').v2;

exports.myProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId).populate('followers followins');
        if(!user){
            return next(createError(404, 'User not found'));
        }
        res.send({
            success: true,
            user
        });

    } catch (error) {
        next(createError());
    }
}

exports.updateProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if(!user){
            return next(createError(404, 'User not found'));
        }

        
        const {email, username, avatar} = req.body;

        if(req.body.password){
            return next(createError(400, 'You can not update password directly'));
        }
        
        
        if(email && user.email!==email){
            const findUser = await User.findOne({email});
            if(findUser) return next(createError(400, 'Email already exist'));
        }

        if(username && user.username!==username){
            const findUser = await User.findOne({username});
            if(findUser) return next(createError(400, 'Username is not available'));
        }
        

        if (!user.avatar.secure_url && !avatar || !avatar) {
            return next(createError(400, 'avatar is required'));
        }
        
        
        if(avatar){
            
            if(user.avatar.secure_url){
                if(user.avatar.secure_url !== req.body.avatar){
                    await cloudinary.uploader.destroy(user.avatar.public_id);
                }
            }

            const newAvatar =  await cloudinary.uploader.upload(avatar, {
                folder: 'blogs/users'
            }) ;
            req.body.avatar = newAvatar;
        }
        
        await User.findByIdAndUpdate(req.userId, { $set: { ...req.body } }, { new: true });
        
        res.send({
            success: true,
            message: 'Profile updated successfully'
        });

    } catch (error) {
        next(createError());
    }
}

exports.updatePassword = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId).select('+password');
        if(!user){
            return next(createError(404, 'User not found'));
        }

        const {oldPassword, newPassword} = req.body;

        const equalPassword = await user.comparePassword(oldPassword);
        if(!equalPassword){
            return next(createError(400, 'Old Password is wrong'));
        }

        user.password = newPassword;
        await user.save();

        res.send({
            success: true,
            message: 'Password updated successfully'
        });

    } catch (error) {
        next(createError());
    }
}

exports.delateProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId).select('+password');
        if(!user){
            return next(createError(404, 'User not found'));
        }

        if(user.avatar.public_id){
            await cloudinary.uploader.destroy(user.avatar.public_id);
        }

        const posts = await Post.find({author: req.userId});

        for(i=0; i<posts.length; i++){
            await cloudinary.uploader.destroy(posts[i].image.public_id);
            await Post.findByIdAndDelete(posts[i]._id);
        }

        await User.findByIdAndDelete(req.userId);
    
        res.send({
            success: true,
            posts,
            message: 'Account deleted successfully'
        });

    } catch (error) {
        next(createError());
    }
}

exports.getUser = async (req, res, next) => {
    try {
        const {username} = req.params;
        const user = await User.findOne({username}).populate('followers followins');;
        if(!user){
            return next(createError(404, 'User not found'));
        }
        res.send({
            success: true,
            user
        });

    } catch (error) {
        next(createError());
    }
}

exports.followUser = async (req, res, next) => {
    try {
        const {username} = req.params;
        const user = await User.findOne({username});
        if(!user){
            return next(createError(404, 'User not found'));
        }

        if(!user.followers.includes(req.userId)){
            await User.findByIdAndUpdate(req.userId, {$push: {followins: user._id}});
            await User.findByIdAndUpdate(user._id, {$push: {followers: req.userId}});

            res.send({
                success: true,
                message: 'User followed'
            });
        }else{
            await User.findByIdAndUpdate(req.userId, {$pull: {followins: user._id}});
            await User.findByIdAndUpdate(user._id, {$pull: {followers: req.userId}});

            res.send({
                success: true,
                message: 'User unfollowed'
            });
        }

    } catch (error) {
        next(createError());
    }
}