import express, {Request, Response } from "express";
import { loginService } from "../service/userService";

const loginRoute = express.Router();

loginRoute.post('/', async (req: Request, res: Response) => {
    try {
        const userData = req.body;
        const response = await loginService(userData);
    } catch (error) {
        
    }
});




export default loginRoute;