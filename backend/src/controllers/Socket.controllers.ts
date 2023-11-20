import {Server as websocketserver} from "socket.io";
import {Express} from "express"
import http from "http";

abstract class Socket{
    socket: websocketserver
    Server: http.Server<typeof http.IncomingMessage, typeof http.ServerResponse>

    constructor(app: Express){
        this.Server = http.createServer(app);
        this.socket = new websocketserver(this.Server);
        this.socket.on("connection", async(socket)=>{
            console.log('conect socket', socket.id);
            socket.emit("shop3d");
            this.SendAll();
        })
        
        this.socket.on("error", (error) => {
            console.error('Socket.io error:', error);
        });
    }

    abstract SendAll() : void;
}

export default Socket;