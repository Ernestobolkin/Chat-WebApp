import { PostPut } from "../interfaces/post";
import { ErrorMessage } from "../interfaces/system";
import { PostCodes, GeneralCodes } from "../enums/SystemCodes";
import { UserInterface } from "../interfaces/user";
import { insertNewPost, fetchAllPosts } from "../repository/postRepository";

export const createPostService = async (postData: PostPut, user: UserInterface): Promise<ErrorMessage | any> => {
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
            author:user._id,
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


export const fetchAllPostsService = async (): Promise<ErrorMessage | any>  => {
    try {
        const posts = await fetchAllPosts();
        if(!posts) {
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