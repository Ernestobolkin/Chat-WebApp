export interface ErrorMessage {
    message?: string;
    code?: string;
}

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}