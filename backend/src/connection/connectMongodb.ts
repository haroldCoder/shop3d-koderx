import mongoose from "mongoose";
import Connection from "./connection";

class ConnectMongoDB extends Connection{
    public connect;

    constructor(){
        super();
        this.connect = mongoose;
    }

    connectDB(): void {
        
    }
}