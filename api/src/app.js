const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { connectDb } = require('./config/db');
const { error } = require('./middlewares/error');
const cloudinary = require('cloudinary').v2;

// routes
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const postRoutes = require('./routes/postRoutes');

// configure env and connect db
dotenv.config({
    path: 'src/config/.env'
});
connectDb();

// cloudinary configuration 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET
});

// frontend url
const frontendUrl = process.env.FRONTEND_URL;

// middlewares
app.use(express.json({
    limit: '100Mb'
}));
app.use(cookieParser());
app.use(cors({
    origin: frontendUrl,
    credentials: true,
    methods: ['GET','POST','PUT', 'DELETE']
}));

// available routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);

// error handler
app.use(error)

// start app
const port = process.env.PORT || 4000;
app.listen(port, ()=>{
    console.log('app is working..');
})