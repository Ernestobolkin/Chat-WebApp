import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    passwordHash: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    // avatar: {
    //     type: String,
    // },
    // friends: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // }],
    // friendRequests: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // }],
    // sentFriendRequests: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'User'
    // }],
    // conversations: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Conversation'
    // }],
    // socketId: {
    //     type: String,
    // },
    // status: {
    //     type: String,
    //     enum: ['online', 'offline', 'away'],
    //     default: 'offline'
    // },
    // lastSeen: {
    //     type: Date,
    //     default: Date.now
    // },
    // isDeleted: {
    //     type: Boolean,
    //     default: false
    // }
}, { timestamps: true });


export const User = mongoose.model('User', userSchema, 'users');
