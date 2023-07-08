import express from "express"
import loginRoute from "./loginRoute"

const ROUTES_PATHS = {
    LOGIN: '/login',
}

export class Routes {
    routes = ROUTES_PATHS;
    expressRoutes = express.Router()
    controllers:any = {
        [ROUTES_PATHS.LOGIN]: loginRoute
    }

    constructor() {
        this.useRouter();
    }
    
    useRouter = () => {
        Object.keys(this.controllers).forEach((key) => {
            console.log(key)
            console.log(`${this.controllers[key]}`)
            this.expressRoutes.use(key, this.controllers[key])
        })
    }
}