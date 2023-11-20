import {io} from "socket.io-client"
import { user } from "../types";
import {Models} from "../types"

abstract class WebSocketServer<T>{
    protected socket;

    constructor(){
        this.socket = io('http://localhost:1001/?username=koderx23641$', { transports : ['websocket'] });
        if(!this.socket.connect){
            this.conectSocket();  
        }
    }

    conectSocket = () =>{
        this.socket.on("connection", ()=>{
            console.log('conect socket of server');   
        })
    }

    abstract getAll() : void;

    abstract create(data: T) : void;
}

export default WebSocketServer;