export interface UserRegisterInterface {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
    birthDate: string;
}

export interface UserRepoRegisterInterface{
    firstName: string;
    lastName: string;
    email: string;
    passwordHash: string;
    birthDate: Date;
} 


export interface UserInterface{
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    _id: string;
    createdAt: string;
    updatedAt: string;
}