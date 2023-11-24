import { UserRepoRegisterInterface } from "../interfaces/user";
import { GeneralResponse } from "../interfaces/system";
import { User } from "../models/user";
import { handleCatchError } from "../service/errorHandlerService";
import { UserInterface } from "../interfaces/user";


export const fetchUserDataById = async (userId: string):Promise<UserInterface | null> => {
    try {
        return await User.findById(userId);
    } catch (error) {
        throw handleCatchError(error, 'Failed to fetch user data');
    }
}

export const fetchUserByField = async (field: string, value?: string): Promise<any | GeneralResponse> => {
    try {
        const query = !value ? { [field]: field } : { [field]: value };
        return await User.findOne(query).lean();
    } catch (error) {
       throw handleCatchError(error, 'Failed to fetch user data');
    }
}

export const insertNewUser = async (userData: UserRepoRegisterInterface) => {
    try {
        const newUser = new User(userData);
        return await newUser.save();
    } catch (error) {
        throw handleCatchError(error, 'Failed to insert new user');
    }
}