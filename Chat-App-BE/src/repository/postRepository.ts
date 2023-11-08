import { PostPut } from "../interfaces/post";
import { Post } from "../models/post";
import { handleCatchError } from "../service/errorHandlerService";




export const insertNewPost = async (postData: PostPut) => {
    try {
        const newPost = new Post(postData);
        return await newPost.save();
    } catch (error) {
        throw handleCatchError(error, 'Failed to insert new post');
    }
}


export const fetchAllPosts = async () => {
    try {
        const lookUp = {
            $lookup: {
                from: 'users',
                localField: 'author',
                foreignField: '_id',
                as: 'author'
            }
        }
        const unwind = {
            $unwind: '$author'
        }
        const project = {
            $project: {
                'author.password': 0,
                'author.email': 0,
                'author.__v': 0,
                'author.createdAt': 0,
                'author.updatedAt': 0,
                'author.passwordHash': 0,
                __v: 0
            }
        };
        return await Post.aggregate([lookUp, unwind,
        {
            $sort: {
                createdAt: -1 // change this to -1 for descending order
            }
        }, project
        ])

    } catch (error) {
        throw handleCatchError(error, 'Failed to fetch posts');
    }
}