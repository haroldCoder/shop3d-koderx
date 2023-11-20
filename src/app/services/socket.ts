import {io} from "socket.io-client"

abstract class WebSocketServer{
    protected socket;

    constructor(){
        this.socket = io('http://localhost:1000/?username=koderx23641$', { transports : ['websocket'] });
        if(!this.socket!.connect){
            this.conectSocket();  
        }
    }

    conectSocket = () =>{
        this.socket!.on("server:users", ()=>{
            console.log('conect socket of server');   
        })
    }

    abstract getAll() : void;

    abstract create() : void;
}

export default WebSocketServer;