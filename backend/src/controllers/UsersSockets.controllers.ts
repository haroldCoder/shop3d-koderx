import ConnectMysql from "../connection/connectMysql";
import { user } from "../interfaces/users";
import ModelsSockets from "./ModelsSockets.controllers";
import Socket from "./Socket.controllers";
import {Express} from "express"

class UsersSockets extends Socket{
    connectmsql: ConnectMysql;
    constructor(app: Express){
        super(app);
        this.connectmsql = new ConnectMysql();
    }

    SendAll = () =>{
        this.connectmsql.connect!.execute(`SELECT * FROM user`, (err, result: Array<user>)=>{
            if(err){
                console.log(err);
                throw err;
            }
           this.socket.emit('server:users', {users: result}); 
        })
    }

    Create = (): void => {
        this.socket.on('client:user', (useri: user)=>{
            console.log(useri.name);
            
            this.connectmsql.connect!.execute(`INSERT INTO user(name, email, cell, key_stripe) VALUES (${useri.name}, ${useri.email}, ${useri.cell}, ${useri.key_stripe})`, (err, result)=>{
                if(err){
                    console.log(err);
                    throw err;
                }
    
                this.SendAll();
            })
        })
    }

    VerifyUser = (): void =>{
        this.socket.on('client:verify_user', (useri: user)=>{
            console.log(useri.email);
            
            this.connectmsql.connect!.execute(`SELECT * FROM user WHERE name=${useri.name} OR email = ${useri.email} OR cell = ${useri.cell}`, (err, result: Array<user>)=>{
                if(err){
                    console.log(err);
                    throw err;
                }

                if(result.length > 0){
                    this.socket.emit("server:response_verify", {msg: "user exist"})
                }
                else{
                    this.socket.emit("client:user", {
                        "name": useri.name,
                        "email": useri.email,
                        "cell": useri.cell,
                        "key_stripe": useri.key_stripe
                    })
                }
            })
        })
    }
}

export default UsersSockets;