import { user } from "../types";
import WebSocketServer from "./socket";

class usersSocket extends WebSocketServer<user>{
    getAll = () => {
        this.socket.on("server:users", (users) => {
            console.log(users);
        })
    }

    create = (user: user): void => {
        console.log(this.socket);
        
        this.socket.emit("client:user", {
            "name": user.name,
            "email": user.email,
            "cell": user.cell,
            "key_stripe": user.key_stripe
        })
    }

    VerifiUserExist = (user: user): void => {
        this.socket.emit("client:verify_user", {
            "name": user.name,
            "email": user.email,
            "cell": user.cell,
            "key_stripe": user.key_stripe
        })
    }
}

export default usersSocket;