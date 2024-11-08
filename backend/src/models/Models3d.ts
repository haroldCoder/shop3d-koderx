import mongoose from "mongoose";
import Connection from "../connection/connection";

export default class Models3d extends Connection {
    protected db: string;
    private models3d: mongoose.Schema;
    protected model: string;
    private static instance: Models3d | null = null;

    constructor(db: string = process.env.MONGO_URI!, model: string = "models3ds") {
        super();
        this.db = db;
        this.model = model;
        this.models3d = new mongoose.Schema({
            id: { type: Number, require: true, unique: false },
            modeluri: {type: String, require: true}
        })
    }

    static getInstance(): Models3d {
        if (!Models3d.instance) {
            Models3d.instance = new Models3d();
        }
        return Models3d.instance;
    }

    public getMongooseModel() {
          return mongoose.models.models3ds || mongoose.model(this.model, this.models3d);  
    }

    connectDB(): void {

    }
}