import { config } from "../config";
import { UserRegisterInterface, UserRepoRegisterInterface } from "../interfaces/user";
import { ErrorMessage } from "../interfaces/system";
import { fetchUserByField, insertNewUser } from "../repository/userRepository";
import { hashPassword, verifyPassword } from "./passwordService";
import { RegisterCodes, GeneralCodes, LoginCodes } from "../enums/SystemCodes";
import { generateToken } from "./jsonwebtokenMiddleware";

export const registerService = async (userData: UserRegisterInterface): Promise<ErrorMessage | any> => {
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
        if (emailUserExists) {
            return {
                message: 'Email already exists',
                code: RegisterCodes.ERROR_EMAIL_EXISTS,
            }
        }
        const usernameUserExists = await fetchUserByField('username', username);
        if (usernameUserExists) {
            return {
                message: 'Username already exists',
                code: RegisterCodes.ERROR_USER_NAME_EXISTS,
            }
        }

        const hashedPassword = await hashPassword(password);
        const userToInsert: UserRepoRegisterInterface = {
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
    if (!(config.PASSWORD_REGEX).test(password)) {
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


export const loginService = async (userData: UserRegisterInterface): Promise<ErrorMessage | any> => {
    try {
        const user = await fetchUserByField('email', userData.email);
        if (!user?._id) {
            return {
                message: 'User does not exist',
                code: LoginCodes.ERROR_WRONG_EMAIL_OR_PASSWORD
            }            
        }

        const passwordMatch = await verifyPassword(userData.password, user.passwordHash);
        if (!passwordMatch) {
            return {
                message: 'Wrong password',
                code: LoginCodes.ERROR_WRONG_EMAIL_OR_PASSWORD
            }
        }

        const token = generateToken(user._id);
        return {
            token, 
        }
    } catch (error) {
        console.error(error);
        return {
            message: 'Internal server error',
            code: LoginCodes.ERROR_COULD_NOT_LOGIN
        }
    }
}