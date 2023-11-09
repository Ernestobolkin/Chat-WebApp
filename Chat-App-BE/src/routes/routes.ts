import express from "express"
import { authenticate, authenticateJWT } from "../service/jsonwebtokenMiddleware";
import loginRoute from "./loginRoute"
import registerRoute from "./registerRoute";
import postRoute from "./postRoute";
import { Server, Socket } from 'socket.io';
import chalk from "chalk";
import { UserInfo } from "os";
import { UserInterface } from "../interfaces/user";
import { createPostService } from "../service/postService";
import { PostPut } from "../interfaces/post";


const ROUTES_PATHS = {
  LOGIN: '/login',
  REGISTER: '/register',
  POST: '/post'
}

const test = express.Router();

test.get('', authenticate, (req, res) => {
  return res.status(200).json({ message: "works" })
})
export class Routes {
  routes = ROUTES_PATHS;
  expressRoutes = express.Router()
  controllers: any = {
    [ROUTES_PATHS.LOGIN]: loginRoute,
    [ROUTES_PATHS.REGISTER]: registerRoute,
    [ROUTES_PATHS.POST]: postRoute, //TODO: add post route controller here [ROUTES_PATHS.CREATEPOST]: postRoute,
    "/test": test
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

interface GeneralReq {
  [x: string]: any;
  jwtToken?: string;
  user?:any;
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
      this.io.use((packet, next) => {

        next();
      })
      socket.on('createPost', async (data: GeneralReq) => await this.handleEvent1( await this.authenticateTest(socket), await this.validateParamsMiddleware(data)));//NOTE - Temp solution for authentication
      // socket.on('event2', (data: Event2Payload) => this.handleEvent2(socket, data));

      socket.on('disconnect', () => {
        this.handleDisconnect(socket);
      });
    });
  }

  async authenticateTest(socket: Socket): Promise<UserInterface | null> {
    const token = socket.handshake.auth.token;
    const user = await  authenticateJWT(token);
    if (!user || !user?.email) {
      this.emitError('Not Authorized');
      return null;
    }
    return user;
  }

  async validateParamsMiddleware(data:GeneralReq) {
    if(!data || !data?.textContent) {
      this.emitError('No data provided');
      return null
    }
    return data;
  }

  async handleEvent1(user: UserInterface | null, reqData: GeneralReq | null) {
    if(!user || !reqData) {
      return;
    }
    const res = await createPostService(reqData as PostPut, user);
    if(res.code){
      this.io.emit('Error', res.message);
      throw new Error(res.message);
    }
    this.io.emit('newPost', reqData);
  }

  handleDisconnect(socket: Socket) {
    console.log(chalk.gray(`Socket disconnected: ${socket.id}`));
  }

  emitError( message: string) {
    console.log(chalk.red(message));
    this.io.emit('Error', message);
  }
}