import { config } from "../config";
import { UserRegister, UserRepoRegister } from "../interfaces/user";
import { ErrorMessage } from "../interfaces/systemCodes";
import { fetchUserByField, insertNewUser } from "../repository/userRepository";
import { hashPassword } from "./passwordService";
import { RegisterCodes, GeneralCodes } from "../enums/SystemCodes";



export const registerService = async (userData: UserRegister): Promise<ErrorMessage | any> => {
    try {
        const { username, email, password, confirmPassword } = userData;
        const passwordValidation = validatePassword(password, confirmPassword);
        if (typeof passwordValidation !== 'boolean') {
            return passwordValidation;
        }
        const emailValidation = validateEmail(email);
        if (typeof emailValidation !== 'boolean') {
            return emailValidation;
        }
        const emailUserExists = await fetchUserByField("email", email);
        if (!emailUserExists?.code && typeof emailUserExists?.message) {
            return {
                message: 'Email already exists',
                code: RegisterCodes.ERROR_EMAIL_EXISTS,
            }
        }
        const usernameUserExists = await fetchUserByField('username', username);
        if (!usernameUserExists?.code && typeof usernameUserExists?.message) {
            return {
                message: 'Username already exists',
                code: RegisterCodes.ERROR_USER_NAME_EXISTS,
            }
        }

        const hashedPassword = await hashPassword(password);
        const userToInsert: UserRepoRegister = {
            username,
            email,
            passwordHash: hashedPassword
        }
        const insertNewUserError = await insertNewUser(userToInsert);
        if (typeof insertNewUserError !== 'boolean') {
            return insertNewUserError;
        }

        return {
            message: 'User registered successfully',
            code: GeneralCodes.OK
        }

    } catch (error) {
        console.error(error);
        return {
            message: 'Internal server error',
            code: RegisterCodes.ERROR_COULD_NOT_CREATE_USER
        }
    }
}

const validatePassword = (password: string, confirmPassword: string): ErrorMessage | boolean => {
    if (password !== confirmPassword) {
        return {
            message: 'Passwords do not match',
            code: RegisterCodes.ERROR_PASSWORDS_DO_NOT_MATCH
        }
    }
    if (!config.PASSWORD_REGEX.test(password)) {
        return {
            message: 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character',
            code: RegisterCodes.ERROR_PASSWORDS_PATTERN
        }
    }

    return true;
}


const validateEmail = (email: string): ErrorMessage | boolean => {
    if (!config.EMAIL_REGEX.test(email)) {
        return {
            message: 'Email is invalid',
            code: RegisterCodes.ERROR_EMAIL_PATTERN
        }
    }
    return true;
}


export const loginService = async (userData: UserRegister): Promise<ErrorMessage | any> => {
    try {
        const user = await fetchUserByField('email', userData.email);
        console.log(user);
    } catch (error) {

    }

}