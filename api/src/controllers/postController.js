const Post = require("../models/Post");
const User = require("../models/User");
const { createError } = require("../utils/createError")
const cloudinary = require("cloudinary").v2;

exports.createPost = async (req, res, next) => {
    try {
        const { image } = req.body;


        if (!image) {
            return next(createError(400, 'Image is required'));
        }

        const img = await cloudinary.uploader.upload(image, {
            folder: 'blogs/posts'
        });
        if (!img) {
            return next(createError());
        }
        req.body.image = img;

        const post = await Post.create({ ...req.body, author: req.userId });

        res.send({
            success: true,
            message: 'New post created',
            post
        });

    } catch (error) {
        next(createError());
    }
}

exports.updatePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return next(createError(404, 'Post not found'));
        }

        
        if (String(post.author) !== String(req.userId)) {
            return next(createError(403, 'You can modified only your posts'));
        }
        
        const { image } = req.body;
        
        if (!post.image.secure_url || !image || !image) {
            return next(createError(400, 'Image is required'));
        }
        
        
        if (image) {
            if (post.image.secure_url) {
                if (post.image.secure_url !== image) {
                    await cloudinary.uploader.destroy(post.image.public_id);
                }
            }
            
            const newImage = await cloudinary.uploader.upload(image, {
                folder: 'blogs/posts'
            });
            

            req.body.image = newImage;
        }
        
        await Post.findByIdAndUpdate(req.params.id, { $set: { ...req.body } }, { new: true });

        res.send({
            success: true,
            message: 'Post updated successfully',
            post
        });

    } catch (error) {
        next(createError());
    }
}

exports.deletePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return next(createError(404, 'Post not found'));
        }

        if (String(post.author) !== String(req.userId)) {
            return next(createError(403, 'You can modified only your posts'));
        }

        if (post.image.public_id) {
            await cloudinary.uploader.destroy(post.image.public_id);
        }

        await Post.findByIdAndDelete(req.params.id);

        res.send({
            success: true,
            message: 'Post deleted successfully'
        });

    } catch (error) {
        next(createError());
    }
}

exports.updateViews = async (req, res, next) => {
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, { $inc: { views: 1 } });
        if (!post) {
            return next(createError(404, 'Post not found'));
        }

        res.send({
            success: true,
            message: 'view added'
        });

    } catch (error) {
        next(createError());
    }
}

exports.getCategories = async (req, res, next) => {
    const categories = ["Windows", "macOS", "ChromeOS", "Android", "iOS", "Gadgets", "Internet"];
    res.send({
        success: true,
        categories
    });
}

exports.getPost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.id).populate('author');
        if (!post) {
            return next(createError(404, 'Post not found'));
        }
        res.send({
            success: true,
            post
        });

    } catch (error) {
        next(createError());
    }
}

exports.getRecentPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().populate('author').sort({ createdAt: -1 }).limit(8);

        res.send({
            success: true,
            posts
        });

    } catch (error) {
        next(createError());
    }
}

exports.getPopularPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().populate('author').sort({ views: -1 }).limit(5);

        res.send({
            success: true,
            posts
        });

    } catch (error) {
        next(createError());
    }
}

exports.getReletedPosts = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.postId);

        const posts = await Post.find({
            $or: [
                { topics: { $in: post.topics } },
                { category: { $regex: post.category, $options: 'i' } }
            ]
        }).populate('author').sort({ createdAt: -1 }).limit(5);

        res.send({
            success: true,
            posts: posts.filter(item => String(item._id) !== String(post._id))
        });

    } catch (error) {
        next(createError());
    }

}

exports.getCatPosts = async (req, res, next) => {
    try {
        const category = req.params.category;
        const posts = await Post.find({ category: { $regex: category, $options: 'i' } }).populate('author').sort({ views: -1 }).limit(5);

        res.send({
            success: true,
            posts
        });

    } catch (error) {
        next(createError());
    }
}

exports.getRandomPosts = async (req, res, next) => {
    try {
        const posts = await Post.aggregate([{ $sample: { size: 5 } }]);

        res.send({
            success: true,
            posts
        });

    } catch (error) {
        next(createError());
    }
}

exports.getUserPosts = async (req, res, next) => {
    try {
        const username = req.params.username;
        const posts = await Post.find({ username }).populate('author').sort({ createdAt: -1 });

        res.send({
            success: true,
            posts
        });

    } catch (error) {
        next(createError());
    }
}

exports.getFollowPosts = async (req, res, next) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) {
            return next(createError(404, 'User not found'));
        }
        const FollowUsers = user.followins;

        const list = await Promise.all(
            FollowUsers.map((author) => {
                return Post.find({ author }).populate('author');
            })
        );

        res.send({
            success: true,
            posts: list.flat().sort((a, b) => b.createdAt - a.createdAt)
        });

    } catch (error) {
        next(createError());
    }
}

exports.getSearchPosts = async (req, res, next) => {
    try {
        const query = req.query.q ? req.query.q : '';

        const posts = await Post.find({
            $or: [
                { title: { $regex: query, $options: 'i' } },
                { desc: { $regex: query, $options: 'i' } },
                { topics: { $in: query } }
            ]
        }).populate('author').sort({ createdAt: -1 });

        res.send({
            success: true,
            posts
        });

    } catch (error) {
        next(createError());
    }
}
