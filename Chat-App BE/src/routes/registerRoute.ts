import express, {Request, Response } from "express";
import { registerService } from "../service/registerService";


const registerRoute = express.Router();

registerRoute.post('/', async (req: Request, res: Response) => {
    try {
        const userData = req.body;
        const response = await registerService(userData);
        if(response.code) {
            return res.status(400).json({
                message: "Something went wrong",
                code: response.code
            });
        }
        return res.status(200).json({});
    } catch (error) {
        //TODO add error handling middleware or method
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


export default registerRoute;