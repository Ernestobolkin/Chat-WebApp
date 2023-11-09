import { Socket, io } from "socket.io-client";
import environment from "../config";
import { getJwtToken } from "./auth-service";


export const createServerConnection = (): Socket => {
    const token = getJwtToken();
    return io(environment.SOCKER_URL,
        { auth: { token: token } }
    );
}
