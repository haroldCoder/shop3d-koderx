import {Server as websocketserver, } from "socket.io";
import {Express} from "express"
import http from "http";
import { user } from "../interfaces/users";
import UsersSockets from "./UsersSockets.controllers";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

abstract class Socket{
    socket: websocketserver
    Server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
    socket_create: boolean = false;
    sk: any = null

    constructor(app: Express){
        this.Server = http.createServer(app);
        this.socket = new websocketserver(this.Server)
            this.socket.on("connection", async(sk)=>{
                this.sk = sk;
                console.log('conect socket', sk.id);
                sk.emit("shop3d");
                this.SendAll()
                this.Create();
                this.VerifyUser();
            }) 
        
        this.socket.on("error", (error) => {
            console.error('Socket.io error:', error);
        });
    }

    abstract SendAll() : void;

    abstract Create() : void;

    abstract VerifyUser(): void
}

export default Socket;