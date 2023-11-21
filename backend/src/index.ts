import express from "express";
import dotenv from "dotenv"
import bodyParser from "body-parser";
import AuthMiddleware from "./middleware/security.middleware";
import ConnectMysql from "./connection/connectMysql";
import Connection from "./connection/connection";
import ConnectMongoDB from "./connection/connectMongodb";
import cors from "cors";
import Socket from "./controllers/Socket.controllers";
import UsersSockets from "./controllers/UsersSockets.controllers";
import ModelsSockets from "./controllers/ModelsSockets.controllers";

dotenv.config()
const app = express();
app.use(bodyParser.json());
app.use(cors());

const authMiddleware = new AuthMiddleware(process.env.APP_KEY as string);
const mysqlconnect: Connection = new ConnectMysql();
const mongodbconnect: Connection = new ConnectMongoDB();
const socket : Socket = new UsersSockets(app);
const socket2 : Socket = new ModelsSockets(app);

app.use("/", authMiddleware.authenticate.bind(authMiddleware), require("./routes/models.route"));
app.use("/", authMiddleware.authenticate.bind(authMiddleware), require("./routes/users.route"));

app.listen(process.env.PORT, ()=>{
    console.log(`Server on port ${process.env.PORT}`);
    mysqlconnect.connectDB();   
    mongodbconnect.connectDB();
})


socket.Server!.listen(parseInt(process.env.PORT!)+1);
socket2.Server!.listen(parseInt(process.env.PORT!)+2)





