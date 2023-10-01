import { UserRepoRegister } from "../interfaces/Iuser";
import { ErrorMessage } from "../interfaces/systemCodes";
import { User } from "../models/user";
import { handleCatchError } from "../service/errorHandlerService";


export const fetchUserData = async (userId: string) => {
    try {
        const userData = await User.findById(userId);
        if (!userData) {
            return {
                message: 'User not found',
                code: "FU1"
            }
        }
        return userData;
    } catch (error) {
        throw handleCatchError(error, 'Failed to fetch user data');
    }
}

export const fetchUserByField = async (field: string, value?: string): Promise<any | ErrorMessage> => {
    try {
        const query = !value ? { [field]: field } : { [field]: value };
        const userData = await User.findOne(query);
        return userData;
    } catch (error) {
       throw handleCatchError(error, 'Failed to fetch user data');
    }
}

export const insertNewUser = async (userData: UserRepoRegister) => {
    try {
        const newUser = new User(userData);
        const savedUser = await newUser.save();
        return savedUser;
    } catch (error) {
        throw handleCatchError(error, 'Failed to insert new user');
    }
}