"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connectMysql_1 = __importDefault(require("../connection/connectMysql"));
const Socket_controllers_1 = __importDefault(require("./Socket.controllers"));
class UsersSockets extends Socket_controllers_1.default {
    constructor(app) {
        super(app);
        this.SendAll = () => {
            this.connectmsql.connect.execute(`SELECT * FROM user`, (err, result) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
                this.sk.emit('server:users', { users: result });
            });
        };
        this.Create = () => {
            this.sk.on('client:user', (useri) => {
                if (!this.VerifyuserWithnoSocket(useri)) {
                    console.log("create", useri);
                    this.connectmsql.connect.execute(`INSERT INTO user(name, email, cell, key_stripe) VALUES ("${useri.name}", "${useri.email}", "${useri.cell}", "${useri.key_stripe}")`, (err, result) => {
                        if (err) {
                            console.log(err);
                            throw err;
                        }
                        this.SendAll();
                        this.sk.emit("response:reg_user", { "msg": true });
                    });
                }
                else {
                    this.sk.emit("response:reg_user", { "msg": false });
                }
            });
        };
        this.VerifyUser = () => {
            this.sk.on('client:verify_user', (useri) => {
                this.connectmsql.connect.execute(`SELECT * FROM user WHERE name="${useri.name}" OR email = "${useri.email}"`, (err, result) => {
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                    if (result.length > 0) {
                        this.sk.emit("server:response_verify", { msg: true });
                    }
                    else {
                        this.sk.emit("server:response_verify", { msg: false });
                    }
                });
            });
        };
        this.VerifyuserWithnoSocket = (useri) => {
            var _a;
            const mysql = new connectMysql_1.default();
            (_a = mysql.connect) === null || _a === void 0 ? void 0 : _a.execute(`SELECT * FROM user WHERE name = "${useri.name}" OR email = "${useri.email}"`, (err, result) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
                if (result.length > 0) {
                    console.log("user exist", result);
                    return true;
                }
                else {
                    return false;
                }
            });
        };
        this.connectmsql = new connectMysql_1.default();
    }
}
exports.default = UsersSockets;
