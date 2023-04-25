const {Schema, model} = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    avatar: {
        public_id: String,
        secure_url: String
    },
    desc: String,
    social:{
        linkedIn: String,
        twitter: String,
        instagram: String
    },
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    followins: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, {timestamps: true});

// hash password before save it
userSchema.pre('save', function(next){
    if(this.isModified('password')){
        this.password = bcrypt.hashSync(this.password, 10);
    }
    next();
});

// genrate and return jwt token
userSchema.methods.getJWTToken = async function(){
    const token = await jwt.sign({id:this._id}, process.env.JWT_SECRET,{
        expiresIn: 30*24*60*60*1000
    });
    return token;
}

// compare given password with user password
userSchema.methods.comparePassword = async function(password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = model('User', userSchema);