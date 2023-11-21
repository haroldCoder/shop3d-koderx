import { user } from "../types";
import WebSocketServer from "./socket";
import {io} from "socket.io-client";
import {toast} from "react-hot-toast"

class usersSocket extends WebSocketServer<user>{
    constructor(){
        super();
        this.socket = io('http://localhost:1001/?username=koderx23641$', { transports : ['websocket'] });
    }
    getAll = () => {

        this.socket.on("server:users", (users) => {
            console.log(users);
        })
    }

    create = (user: user): void => {
        this.socket.emit("client:user", {
            "name": user.name,
            "email": user.email,
            "cell": user.cell,
            "key_stripe": user.key_stripe
        })

        this.socket.on("response:reg_user", (data)=>{
            if(data.msg){
                toast.success("User register")
                setInterval(()=>{
                    location.href = "/"
                }, 1500)
            }
            else{
                toast.error("User exist or problems with server")
                console.log(data);
                
            }
        })
    }

    VerifiUserExist = (user: user): void => {
        console.log(user);
        
        this.socket.emit("client:verify_user", {
            "name": user.name,
            "email": user.email,
            "cell": user.cell,
            "key_stripe": user.key_stripe
        })

        this.socket.on("server:response_verify", (data)=>{
            console.log(data);
            
            if(data.msg){
                toast.success("user exist");
                setInterval(()=>{
                    location.href = "/"  
                }, 1000)
            }
            else{
                toast.error("user not exist...")
                location.href = "/signup-user"
            }
        })
    }
}

export default usersSocket;