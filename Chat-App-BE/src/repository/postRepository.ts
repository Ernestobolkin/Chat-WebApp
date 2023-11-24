import { convertToObjectId } from "../helpers/mongo";
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

export const likeOrDislike = async (postId: string, userData: { userId: string, email: string }) => {
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return false;
        }
        const isLiked = post.likes.find(like => like.email === userData.email);
        if (isLiked) {
            post.likes = post.likes.filter(like => like.email !== userData.email);
        } else {
            const like = {
                userId: convertToObjectId(userData.userId),
                email: userData.email
            }
            post.likes.push(like);
        }
        await post.save();
        return true;
    } catch (error) {
        throw handleCatchError(error, 'Failed to insert like');
    }

}

export const fetchPostById = async (postId: string) => {
    try {
        return await Post.findById(postId).populate('author', '-password -__v -createdAt -updatedAt -passwordHash');
    } catch (error) {
        throw handleCatchError(error, 'Failed to fetch post');
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