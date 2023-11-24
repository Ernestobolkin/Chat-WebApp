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
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        email: {
            type: String,
            required: true,
        },
    }],
    comments: [{
        type:Array,
        ref: 'Comment' //TODO plan on a way to save the comments
    }],

}, {
    timestamps: true
})

export const Post = mongoose.model('Post', postSchema, 'posts');