import mongoose from "mongoose";
import Connection from "./connection";
import Models3d from "../models/Models3d";

export default class ConnectMongoDB extends Models3d{
    public connect: mongoose.Connection;

    constructor(){
        super("models");
        this.connect = mongoose.connection;
        mongoose.connect(process.env.MONGODB_URI || "",{});
    }

    connectDB(): void {
        this.connect.once('open', ()=>{
            console.log('db connect mongodb');
            
        })
    }
}