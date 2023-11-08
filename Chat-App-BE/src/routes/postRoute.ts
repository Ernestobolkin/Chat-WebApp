import express, {Request, Response } from "express";
import { PostPut } from "../interfaces/post";
import { createPostService, fetchAllPostsService } from "../service/postService";
import { fetchUserDataById } from "../repository/userRepository";
const postRoute = express.Router();

postRoute.post('/create', async (req: Request, res: Response) => {
    try {
        const postData:PostPut = req.body;
        const userId = req.userId;
        const user = await fetchUserDataById(userId);
        if (!user) {
            return res.status(404).json({message: "Not authorized"});
        }
        const response = await createPostService(postData, user);
        if(response.code) {
            return res.status(400).json({code:response.code});
        }
        return res.status(200).json(response);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal server error"});
    }
});


postRoute.get('/all', async (req: Request, res: Response) => {
    try {
        const posts = await fetchAllPostsService();
        if(posts.code) {
            return res.status(400).json({code:posts.code});
        }
        return res.status(200).json(posts);
    } catch (error) {
        console.error(error);
        return res.status(500).json({message: "Internal server error"});
    }
});



export default postRoute;