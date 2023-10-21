import express from "express"
import { authenticate } from "../service/jsonwebtokenMiddleware";
import loginRoute from "./loginRoute"
import registerRoute from "./registerRoute";

const ROUTES_PATHS = {
    LOGIN: '/login',
    REGISTER: '/register'
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
        "/test":test
    }

    constructor() {
        this.useRouter();
    }
    
    useRouter = () => {
        Object.keys(this.controllers).forEach((key) => {
            this.expressRoutes.use(key, this.controllers[key])
        })
    }
}