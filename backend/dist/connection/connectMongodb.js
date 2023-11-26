"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Models3d_1 = __importDefault(require("../models/Models3d"));
class ConnectMongoDB extends Models3d_1.default {
    constructor() {
        super("models");
        this.connect = mongoose_1.default.connection;
        mongoose_1.default.connect(process.env.MONGODB_URI || "", {});
    }
    connectDB() {
        this.connect.once('open', () => {
            console.log('db connect mongodb');
        });
    }
}
exports.default = ConnectMongoDB;
