"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql2_1 = __importDefault(require("mysql2"));
const connection_1 = __importDefault(require("./connection"));
class ConnectMysql extends connection_1.default {
    constructor() {
        super();
        this.isconect = false;
        if (!this.isconect) {
            this.connect = mysql2_1.default.createConnection({
                user: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                host: process.env.MYSQL_HOST,
                port: parseInt(process.env.MYSQL_PORT),
                database: process.env.MYSQL_DATABASE
            });
            this.isconect = true;
        }
    }
    connectDB() {
        this.connect.on("connection", () => { });
        console.log('connect to mysql');
        this.connect.on("error", (err) => {
            console.log(err);
        });
    }
}
exports.default = ConnectMysql;
