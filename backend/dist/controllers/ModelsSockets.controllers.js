"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connectMysql_1 = __importDefault(require("../connection/connectMysql"));
const Socket_controllers_1 = __importDefault(require("./Socket.controllers"));
const Models3d_1 = __importDefault(require("../models/Models3d"));
class ModelsSockets extends Socket_controllers_1.default {
    constructor(app) {
        super(app);
        this.SendAll = () => {
            const mongo = new Models3d_1.default();
            this.connectmysql.connect.execute(`SELECT * FROM models`, (err, result) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    console.error(err);
                    return;
                }
                const models3d = new Array();
                yield Promise.all(result.map((md) => __awaiter(this, void 0, void 0, function* () {
                    const model3D = yield mongo.getMongooseModel().findOne({ id: md.Id });
                    models3d.push(Object.assign(Object.assign({}, md), { model: model3D }));
                })));
                this.socket.emit("server:models", { models: models3d });
            }));
        };
        this.Create = () => {
            this.socket.on('client:models', (mod) => {
                this.connectmysql.connect.execute(`INSERT INTO user(name, description, price, Iduser) VALUES (${mod.name}, ${mod.description}, ${mod.price}, ${mod.Iduser})`, (err, result) => {
                    if (err) {
                        console.log(err);
                        throw err;
                    }
                    this.SendAll();
                });
            });
        };
        this.connectmysql = new connectMysql_1.default();
    }
    VerifyUser() {
    }
}
exports.default = ModelsSockets;
