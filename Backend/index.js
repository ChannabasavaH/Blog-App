import express from 'express'
import mongoose from 'mongoose'
import Blog from './models/BlogSchema.js';

const app = express();
app.use(express.json());

app.post('/api/blogs', async(req,res) => {
    try {
        const { title,description,date } = req.body;
        const data = new Blog({ title,description,date });
        await data.save();
        res.status(200).json("blog saved successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

app.get('/api/blogs', async(req,res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

app.get('/api/blogs/:id', async(req,res) => {
    try {
        const { id } = req.params;
        const blogs = await Blog.findById(id);
        res.status(200).json(blogs);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

app.put('/api/blogs/:id/edit', async(req,res) => {
    try {
        const { id } = req.params;
        const { title,description,editedTime } = req.body;
        const updateBlog = await Blog.findByIdAndUpdate(id, { title,description,editedTime }, { new: true });
        if(!updateBlog){
            res.status(400).json("Not Found");
        }
        res.status(200).json(updateBlog);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

app.delete('/api/blogs/:id/delete', async(req,res) => {
    try {
        const { id } = req.params;
        const deletedBlog = await Blog.findByIdAndDelete(id);
        if(!deletedBlog){
            res.status(400).json("Not Found");
        }
        res.status(200).json(deletedBlog);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
})

mongoose.connect("mongodb://localhost:27017/blogs")
    .then(() => {
        console.log("Connected to database");
        app.listen("8080",() => {
            console.log("app is listening to port 8080");
        })
    })
    .catch((error) => {
        console.log(error);
    })