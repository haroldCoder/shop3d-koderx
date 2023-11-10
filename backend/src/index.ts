import express from "express";
import path from "path";
import {Server as websocketserver} from "socket.io";
import http from "http";
import dotenv from "dotenv"
import bodyParser from "body-parser";

dotenv.config()
const app = express();
app.use(bodyParser.json());
const server = http.createServer(app);
const io = new websocketserver(server);

io.on("connection", async(socket)=>{
    console.log('conect socket', socket.id);
    socket.emit("shop3d");
})

server.listen(process.env.PORT, ()=>{
    console.log(`Server on port ${process.env.PORT}`);
})