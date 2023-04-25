# TechBlogs - Blog site (MERN Stack)

TechBlogs is fully functional and responsive blogging site which is inspired from techwiser.com to view 👉 [click here](https://techwiser.netlify.app/).

## Features

- User can view all posts.
- User can search all posts.
- User can view other user profile and their posts
- User can add new post
- User can edit and delete own posts
- User can signup and login account
- User can update own profile and password

## Tech Stack

**Client:** React, Redux-toolkit

**Server:** Node, Express, MongoDb, Mongoose

## Libraries Used

**Client:** Axios, Formik, Yup, React-quill, React-hot-toast, Timeago.js, Sass

**Server:** Cors, Bcrypt, Jsonwebtoken, Cloudinary

## Screenshots

**Homepage**

![hom-1](https://user-images.githubusercontent.com/93827592/234312584-7573b216-376e-4858-910b-efc1f70c43c6.png)
<hr/>

**Category**

![category](https://user-images.githubusercontent.com/93827592/234322383-6703566c-37d8-4032-b244-7537a5065bb6.png)
<hr/>

**Search**

![search](https://user-images.githubusercontent.com/93827592/234313510-286b2777-e03d-4e04-a813-1f58f2d325e1.png)
<hr/>

**Post Details**

![post](https://user-images.githubusercontent.com/93827592/234314151-9bfc45aa-ee6f-4852-9791-32ec1b56c998.png)
<hr/>

**Profile**

![pro](https://user-images.githubusercontent.com/93827592/234323822-ea76c4a2-b0e8-44a4-8c03-681c3fbdc59c.png)


## Environmet Variables

To run this project, you will need to add the following environment variables to your .env file

Inside Client Folder :

`VITE_BASE_URL`

Inside Server Folder :

`PORT`
`JWT_SECRET`
`MONGO_URL`
`CLOUDINARY_NAME`
`CLOUDINARY_KEY`
`CLOUDINARY_SECRET`
`FRONTEND_URL`

## Installation

Inside Client & Server install with npm

```bash
  npm install
```

## How to use

Users can log in into site by clicking the login button and fill in the right credentials, new users can signup themself by clicking on the signuo button and fill a simple form, after successful login user can start reading posts and writing posts, etc.
