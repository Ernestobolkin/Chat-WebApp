import express, { Request, Response } from "express";
import { loginService } from "../service/userService";

const loginRoute = express.Router();

loginRoute.post('/', async (req: Request, res: Response) => {
    try {
        const userData = req.body;
        const response = await loginService(userData);
        if (response?.code) {
            return res.status(400).json({ code: response.code });
        }
        return res.status(200).json({ token: response.data.token, user: response.data.user });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ code: 500 });
    }
});




export default loginRoute;