import {io} from "socket.io-client"
import { user } from "../types";
import {Models} from "../types"

abstract class WebSocketServer<T>{
    public socket;

    constructor(){
        this.socket = io('http://localhost:1001/?username=koderx23641$', { transports : ['websocket'] });
        this.conectSocket();  
    }

    conectSocket = () =>{
        this.socket.on("connection", ()=>{
            console.log('conect socket of server');   
        })
    }

    abstract getAll(setter: React.Dispatch<React.SetStateAction<T[]>>): void;

    abstract create(data: T) : void;
}

export default WebSocketServer;