import express from "express"
import loginRoute from "./loginRoute"
import registerRoute from "./registerRoute";

const ROUTES_PATHS = {
    LOGIN: '/login',
    REGISTER: '/register'
}

export class Routes {
    routes = ROUTES_PATHS;
    expressRoutes = express.Router()
    controllers:any = {
        [ROUTES_PATHS.LOGIN]: loginRoute,
        [ROUTES_PATHS.REGISTER]: registerRoute
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