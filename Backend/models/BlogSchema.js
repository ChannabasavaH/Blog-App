import mongoose, { Schema } from "mongoose";

const BlogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    date: {
        type: String,
    },
    editedTime: {
        type: String,
    }
})

const Blog = mongoose.model("Blog",BlogSchema);

export default Blog