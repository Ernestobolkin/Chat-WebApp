import express, {Request, Response } from "express";

const loginRoute = express.Router();

loginRoute.post('/', (req: Request, res: Response) => {
    return res.json({
        message: 'Login route'
    });
});




export default loginRoute;