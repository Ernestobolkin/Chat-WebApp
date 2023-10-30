import { PostPut } from "../interfaces/post";
import { ErrorMessage } from "../interfaces/system";
import { PostCodes, GeneralCodes } from "../enums/SystemCodes";




export const putPostService = async (postData: PostPut, userId: string): Promise<ErrorMessage | any> => {
    try {
        const { textContent, imageContent } = postData;
        if (!textContent) {
            return {
                message: 'Post must contain text',
                code: PostCodes.ERROR_MISSING_PARAMETERS
            }
        }
        return {
            message: 'Post updated successfully',
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