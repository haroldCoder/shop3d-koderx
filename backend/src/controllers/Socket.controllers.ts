import {Server as websocketserver} from "socket.io";
import {Express} from "express"
import http from "http";
import { user } from "../interfaces/users";
import UsersSockets from "./UsersSockets.controllers";

abstract class Socket{
    socket: websocketserver
    Server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>
    socket_create: boolean = false;

    constructor(app: Express){
        this.Server = http.createServer(app);
        this.socket = new websocketserver(this.Server);
        if(!this.socket_create){
            this.socket.on("connection", async(socket)=>{
                console.log('conect socket', socket.id);
                socket.emit("shop3d");
                
                this.Create();
                this.SendAll();
                this.VerifyUser();
            }) 
            this.socket_create = true;
        }
        console.log(this.socket_create);
        
        
        
        this.socket.on("error", (error) => {
            console.error('Socket.io error:', error);
        });
    }

    abstract SendAll() : void;

    abstract Create() : void;

    abstract VerifyUser(): void
}

export default Socket;