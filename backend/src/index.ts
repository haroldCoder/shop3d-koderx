import express from "express";
import path from "path";
import {Server as websocketserver} from "socket.io";
import http from "http";
import dotenv from "dotenv"
import bodyParser from "body-parser";
import AuthMiddleware from "./middleware/security.middleware";
import ConnectMysql from "./connection/connectMysql";
import Connection from "./connection/connection";

dotenv.config()
const app = express();
app.use(bodyParser.json());
const server = http.createServer(app);
const io = new websocketserver(server);
const authMiddleware = new AuthMiddleware(process.env.APP_KEY as string);
const mysqlconnect: Connection = new ConnectMysql();

io.on("connection", async(socket)=>{
    console.log('conect socket', socket.id);
    socket.emit("shop3d");
})

app.get("/", authMiddleware.authenticate.bind(authMiddleware), (req, res)=>{
    res.send("Hello")
})

server.listen(process.env.PORT, ()=>{
    console.log(`Server on port ${process.env.PORT}`);
    mysqlconnect.connectDB();
})