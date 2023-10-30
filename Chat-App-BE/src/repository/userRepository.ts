import { UserRepoRegister } from "../interfaces/user";
import { ErrorMessage } from "../interfaces/system";
import { User } from "../models/user";
import { handleCatchError } from "../service/errorHandlerService";


export const fetchUserDataById = async (userId: string) => {
    try {
        return await User.findById(userId);
    } catch (error) {
        throw handleCatchError(error, 'Failed to fetch user data');
    }
}

export const fetchUserByField = async (field: string, value?: string): Promise<any | ErrorMessage> => {
    try {
        const query = !value ? { [field]: field } : { [field]: value };
        return await User.findOne(query);
    } catch (error) {
       throw handleCatchError(error, 'Failed to fetch user data');
    }
}

export const insertNewUser = async (userData: UserRepoRegister) => {
    try {
        const newUser = new User(userData);
        return await newUser.save();
    } catch (error) {
        throw handleCatchError(error, 'Failed to insert new user');
    }
}