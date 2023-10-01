import bcrypt from 'bcrypt';
import { handleCatchError }  from './errorHandlerService';


export const hashPassword = async (password: string):Promise<string> => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (error) {
        throw handleCatchError(error, 'Could not hash password, Error in hashPassword')
    }
}

export const verifyPassword = async (password: string, hashedPassword: string):Promise<boolean> => {
    try {
        const isPasswordValid = await bcrypt.compare(password, hashedPassword);
        return isPasswordValid;
    } catch (error) {
        throw handleCatchError(error, 'Could not verify password, Error in verifyPassword')
    }
}