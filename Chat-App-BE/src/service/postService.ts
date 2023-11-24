import { PostPut } from "../interfaces/post";
import { GeneralResponse } from "../interfaces/system";
import { PostCodes, GeneralCodes } from "../enums/SystemCodes";
import { UserInterface } from "../interfaces/user";
import { insertNewPost, fetchAllPosts, fetchPostById, likeOrDislike } from "../repository/postRepository";

export const createPostService = async (postData: PostPut, user: UserInterface): Promise<GeneralResponse | any> => {
    try {
        const { textContent, imageContent } = postData;
        if (!textContent) {
            return {
                message: 'Post must contain text',
                code: PostCodes.ERROR_MISSING_PARAMETERS
            }
        }
        //add image validation here
        const post = {
            textContent,
            imageContent,
            author: user._id,
        }
        await insertNewPost(post)
        return {
            message: 'Post created successfully',
            code: GeneralCodes.OK
        }
    } catch (error) {
        console.error(error);
        return {
            message: 'Internal server error',
            code: PostCodes.ERROR_COULD_NOT_CREATE_POST
        }
    }
}

export const deletePostService = async (postId: string, user: UserInterface): Promise<GeneralResponse | any> => {
    try {
        const post = await fetchPostById(postId);
        if (!post) {
            return {
                message: 'Could not fetch post',
                code: PostCodes.ERROR_COULD_NOT_FETCH_POSTS
            }
        }
        if (post?.author && post.author._id.toString() !== user._id.toString()) {
            return {
                message: 'Not authorized',
                code: GeneralCodes.UNAUTHORIZED
            }
        }
        await post.deleteOne({ _id: postId});
        return {
            message: 'Post deleted successfully',
            code: GeneralCodes.OK
        }
    } catch (error) {
        console.error(error);
        return {
            message: 'Internal server error',
            code: PostCodes.ERROR_COULD_NOT_DELETE_POST
        }
    }

}


export const fetchAllPostsService = async (): Promise<GeneralResponse | any> => {
    try {
        const posts = await fetchAllPosts();
        if (!posts) {
            return {
                message: 'Could not fetch posts',
                code: PostCodes.ERROR_COULD_NOT_FETCH_POSTS
            }
        }
        return posts;
    } catch (error) {
        console.error(error);
        return {
            message: 'Internal server error',
            code: PostCodes.ERROR_COULD_NOT_FETCH_POSTS
        }
    }
}


export const likePostService = async (postId: string, user: UserInterface): Promise<GeneralResponse | any> => {
    try {
        const post = await fetchPostById(postId);
        if (!post) {
            return {
                message: 'Could not fetch post',
                code: PostCodes.ERROR_COULD_NOT_FETCH_POSTS
            }
        }
        const userData = {
            userId: user._id,
            email: user.email,
        };
        await likeOrDislike(postId, userData)
    } catch (error) {
        console.error(error);
        return {
            message: 'Internal server error',
            code: PostCodes.ERROR_COULD_NOT_FETCH_POSTS
        }
    }
}