import { ErrorMessage } from "../interfaces/systemCodes";
import { User } from "../models/user";


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
        console.error(error);
        return {
            message: 'Internal server error',
            code: "FU2"
        }
    }
}

export const fetchUserByField = async (field: string, value?: string):Promise<any | ErrorMessage> => {
    try {
        const query = !value ? { [field]: field } : { [field]: value };
        const userData = await User.findOne(query);
        if (!userData) {
            return {
                message: 'User not found',
                code: "FU1"
            }
        }
        return userData;
    } catch (error) {
        console.error(error);
        return {
            message: 'Internal server error',
            code: "FU2"
        }
    }
}

export const insertNewUser = async (userData: any) => {
    try {
        const newUser = new User(userData);
        const savedUser = await newUser.save();
        return savedUser;
    } catch (error) {
        console.error(error);
        return {
            message: 'Internal server error',
            code: "FU2"
        }
    }
}