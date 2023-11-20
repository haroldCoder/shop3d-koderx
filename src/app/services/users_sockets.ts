import WebSocketServer from "./socket";

class usersSocket extends WebSocketServer{
    getAll = () =>{
        this.socket!.on("server:users", (users)=>{
            console.log(users);
        })
    }
    
    create = (): void => {
        
    }
}

export default usersSocket;