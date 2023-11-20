import WebSocketServer from "./socket";


class ModelsSockets extends WebSocketServer{
    getAll = (): void => {
        this.socket.on("server:models", (data)=>{
            console.log(data);
            
        })
    }

    create = (): void => {
        
    }
}

export default ModelsSockets;