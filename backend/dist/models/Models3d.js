"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connection_1 = __importDefault(require("../connection/connection"));
class Models3d extends connection_1.default {
    constructor(db = process.env.MONGO_URI, model = "models3ds") {
        super();
        this.db = db;
        this.model = model;
        this.models3d = new mongoose_1.default.Schema({
            id: { type: Number, require: true, unique: false },
            model: { type: Buffer, require: true },
            modeluri: { type: String, require: true }
        });
    }
    static getInstance() {
        if (!Models3d.instance) {
            Models3d.instance = new Models3d();
        }
        return Models3d.instance;
    }
    getMongooseModel() {
        return mongoose_1.default.models.models3ds || mongoose_1.default.model(this.model, this.models3d);
    }
    connectDB() {
    }
}
Models3d.instance = null;
exports.default = Models3d;
