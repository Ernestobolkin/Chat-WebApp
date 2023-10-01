export interface UserRegister {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface UserRepoRegister{
    username: string;
    email: string;
    passwordHash: string;
} 