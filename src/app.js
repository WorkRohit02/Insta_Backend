const express = require('express');
const multer = require('multer') ;
const uploadFile = require('./services/storage.services') ;
const postModel = require('./model/post.model') ;
const cors = require('cors') ;

const upload = multer({ storage: multer.memoryStorage() });
const app = express();

app.use(cors());
app.use(express.json());

app.post('/create-post' , upload.single("image") , async (req,res) => {
    try {
        console.log(req.body) ;
        console.log(req.file) ;

        if (!req.file) {
            return res.status(400).json({ message: 'Image file is required' });
        }

        const result = await uploadFile(req.file.buffer) ;

        const post = await postModel.create({
            image: result.url, 
            caption: req.body.caption
        })

        return res.status(200).json({
            message : "Post Created",
            post
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to create post', error: error.message });
    }
})

app.get('/posts' , async (req,res) => {
    try {
        const posts = await postModel.find().sort({ createdAt: -1 });
        return res.status(200).json({ posts });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Failed to fetch posts', error: error.message });
    }
})

module.exports = app;