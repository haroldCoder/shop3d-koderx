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

dotenv.config()
const app = express();
app.use(bodyParser.json());
app.use(cors());

const authMiddleware = new AuthMiddleware(process.env.APP_KEY as string);
const mysqlconnect: Connection = new ConnectMysql();
const mongodbconnect: Connection = new ConnectMongoDB();
const {Server} : Socket = new UsersSockets(app);

app.use("/", authMiddleware.authenticate.bind(authMiddleware), require("./routes/models.route"));
app.use("/", authMiddleware.authenticate.bind(authMiddleware), require("./routes/users.route"));

Server.listen(process.env.PORT, ()=>{
    console.log(`Server on port ${process.env.PORT}`);
    mysqlconnect.connectDB();
    mongodbconnect.connectDB();
})