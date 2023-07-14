import express, {Request, Response } from "express";


const registerRoute = express.Router();

registerRoute.post('/', (req: Request, res: Response) => {
    return res.json({
        message: 'Register route'
    });
});
