import ConnectMysql from "../connection/connectMysql";
import { user } from "../interfaces/users";
import ModelsSockets from "./ModelsSockets.controllers";
import Socket from "./Socket.controllers";
import { Express } from "express"

class UsersSockets extends Socket {
    connectmsql: ConnectMysql;
    constructor(app: Express) {
        super(app);
        this.connectmsql = new ConnectMysql();
    }

    SendAll = () => {
        this.connectmsql.connect!.execute(`SELECT * FROM user`, (err, result: Array<user>) => {
            if (err) {
                console.log(err);
                throw err;
            }
            this.sk.emit('server:users', { users: result });
        })
    }

    Create = (): void => {
        this.sk.on('client:user', (useri: user) => {
            if (!this.VerifyuserWithnoSocket(useri)!) {
                console.log("create", useri);
                this.connectmsql.connect!.execute(`INSERT INTO user(name, email, cell, key_stripe) VALUES ("${useri.name}", "${useri.email}", "${useri.cell}", "${useri.key_stripe}")`, (err, result) => {
                    if (err) {
                        console.log(err);
                        throw err;
                    }

                    this.SendAll();
                    this.sk.emit("response:reg_user", {"msg": true})
                })
            }
            else{
                this.sk.emit("response:reg_user", {"msg": false})
            }
        })
    }

    VerifyUser = (): void => {
        this.sk.on('client:verify_user', (useri: user) => {
            this.connectmsql.connect!.execute(`SELECT * FROM user WHERE name="${useri.name}" OR email = "${useri.email}"`, (err, result: Array<user>) => {
                if (err) {
                    console.log(err);
                    throw err;
                }

                if (result.length > 0) {
                    this.sk.emit("server:response_verify", { msg: true })
                }
                else {
                    this.sk.emit("server:response_verify", { msg: false })
                }
            })
        })
    }

    VerifyuserWithnoSocket = (useri: user) => {
        const mysql = new ConnectMysql();

        mysql.connect?.execute(`SELECT * FROM user WHERE name = "${useri.name}" OR email = "${useri.email}"`, (err, result: Array<user>) => {
            if (err) {
                console.log(err);
                throw err;
            }

            if (result.length > 0) {
                console.log("user exist", result);
                return true
            }
            else {
                return false
            }
        })
    }
}

export default UsersSockets;