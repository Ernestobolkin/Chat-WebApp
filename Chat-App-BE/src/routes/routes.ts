import express from "express"
import { authenticate } from "../service/jsonwebtokenMiddleware";
import loginRoute from "./loginRoute"
import registerRoute from "./registerRoute";
import postRoute from "./postRoute";

const ROUTES_PATHS = {
    LOGIN: '/login',
    REGISTER: '/register',
    POST: '/post'
}

const test = express.Router();

test.get('',   authenticate, (req, res) => {
    return res.status(200).json({message: "works"})
})
export class Routes {
    routes = ROUTES_PATHS;
    expressRoutes = express.Router()
    controllers:any = {
        [ROUTES_PATHS.LOGIN]: loginRoute,
        [ROUTES_PATHS.REGISTER]: registerRoute,
        [ROUTES_PATHS.POST]: postRoute, //TODO: add post route controller here [ROUTES_PATHS.CREATEPOST]: postRoute,
        "/test":test
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