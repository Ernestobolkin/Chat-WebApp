import express from "express"
import { authenticate } from "../service/jsonwebtokenMiddleware";
import loginRoute from "./loginRoute"
import registerRoute from "./registerRoute";
import postRoute from "./postRoute";
import e from "express";

const ROUTES_PATHS = {
    LOGIN: '/login',
    REGISTER: '/register',
    POSTS: '/posts'
}


const authCheck = express.Router();
authCheck.get('', authenticate, (req, res) => {
    return res.status(200).json({valid: true})
})

export class Routes {
    routes = ROUTES_PATHS;
    expressRoutes = express.Router()
    controllers:any = {
        [ROUTES_PATHS.LOGIN]: loginRoute,
        [ROUTES_PATHS.REGISTER]: registerRoute,
        [ROUTES_PATHS.POSTS]: postRoute, //TODO: add post route controller here [ROUTES_PATHS.CREATEPOST]: postRoute,
        "/auth":authCheck
    }

    constructor() {
        this.useRouter();
    }
    
    useRouter = () => {
        Object.keys(this.controllers).forEach((key) => {
            this.expressRoutes.use(key, authenticate, this.controllers[key])
        })
    }
}