const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    image: {
        public_id: String,
        secure_url: String
    },
    category: {
        type: String,
        required: true,
    },
    topics: [String],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    views: {
        type: Number,
        default: 0
    }
}, {timestamps: true});


module.exports = model('Post', postSchema);