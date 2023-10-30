import mongoose from "mongoose";


const postSchema = new mongoose.Schema({
    textContent: {
        type: String,
        required: true,
        minlength: 1,
    },
    imageContent: {
        type: String,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [{


    }],

}, {
    timestamps: true
})

export const Post = mongoose.model('Post', postSchema, 'posts');