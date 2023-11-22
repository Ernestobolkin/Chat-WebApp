import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
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
    birthDate: {
        type: Date,
        required: true,
    }
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
