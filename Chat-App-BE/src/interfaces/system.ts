export interface GeneralResponse {
    message?: string;
    code?: string;
    data?: any;
}

declare global {
    namespace Express {
        interface Request {
            userId: string;
        }
    }
}