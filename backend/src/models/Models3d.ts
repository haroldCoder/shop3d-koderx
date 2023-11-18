import mongoose from "mongoose";
import Connection from "../connection/connection";

export default class Models3d extends Connection{
    db: string;
    models3d: mongoose.Schema;
    protected model;

    constructor(db: string){
        super();
        this.db = db;
        this.models3d = new mongoose.Schema({
            name: {type: String, require: true, unique: false},
            model: {type: Buffer, require: true}
        })
        this.model = mongoose.model("models3d", this.models3d);
    }

    connectDB(): void {
        
    }
}