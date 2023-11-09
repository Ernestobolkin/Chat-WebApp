import express from "express"
import { authenticate } from "../service/jsonwebtokenMiddleware";
import loginRoute from "./loginRoute"
import registerRoute from "./registerRoute";
import postRoute from "./postRoute";
import { Server, Socket } from 'socket.io';
import chalk from "chalk";


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

interface Event1Payload {
  // Define the structure of data expected for 'event1'
  // For example:
  userId: string;
  message: string;
}

interface Event2Payload {
  // Define the structure of data expected for 'event2'
  // For example:
  userId: string;
  data: any;
}

export class SocketIORoutes {
  private io: Server;

  constructor(io: Server) {
    this.io = io;
  }

  setupRoutes() {
    this.io.on('connection', (socket: Socket) => {
      // Middleware: Authenticate socket connection if needed
      this.authenticate(socket);

      socket.on('event1', (data: Event1Payload) => this.handleEvent1(socket, data));
      socket.on('event2', (data: Event2Payload) => this.handleEvent2(socket, data));

      // More socket.on() handlers for other events...

      socket.on('disconnect', () => {
        // Handle disconnection
        this.handleDisconnect(socket);
      });
    });
  }

  authenticate(socket: Socket) {
    console.log(chalk.gray(`Socket connected: ${socket}`));
  }

  handleEvent1(socket: Socket, data: Event1Payload) {
    // Your logic for handling 'event1' goes here
    // Access data.userId and data.message with type safety
  }

  handleEvent2(socket: Socket, data: Event2Payload) {
    // Your logic for handling 'event2' goes here
    // Access data.userId and data.data with type safety
  }

  handleDisconnect(socket: Socket) {
    console.log(chalk.gray(`Socket disconnected: ${socket.id}`));
  }
}