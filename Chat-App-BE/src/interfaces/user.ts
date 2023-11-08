export interface UserRegisterInterface {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface UserRepoRegisterInterface{
    username: string;
    email: string;
    passwordHash: string;
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