import WebSocketServer from "./socket";

class usersSocket extends WebSocketServer{
    getAllUsers = () =>{
        this.socket!.on("server:users", (users)=>{
            console.log(users);
        })
    }
}

export default usersSocket;