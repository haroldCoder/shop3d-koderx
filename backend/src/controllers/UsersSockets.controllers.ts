import ConnectMysql from "../connection/connectMysql";
import { user } from "../interfaces/users";
import Socket from "./Socket.controllers";
import {Express} from "express"

class UsersSockets extends Socket{
    connectmsql: ConnectMysql;
    constructor(app: Express){
        super(app);
        this.connectmsql = new ConnectMysql();
    }

    SendAll = () =>{
        this.connectmsql.connect.execute(`SELECT * FROM user`, (err, result: Array<user>)=>{
            if(err){
                console.log(err);
                throw err;
            }
           this.socket.emit('server:users', {users: result}); 
        })
    }
}

export default UsersSockets;