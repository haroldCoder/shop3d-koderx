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
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
class Socket {
    constructor(app) {
        this.socket_create = false;
        this.sk = null;
        this.Server = http_1.default.createServer(app);
        this.socket = new socket_io_1.Server(this.Server);
        this.socket.on("connection", (sk) => __awaiter(this, void 0, void 0, function* () {
            this.sk = sk;
            console.log('conect socket', sk.id);
            sk.emit("shop3d");
            this.SendAll();
            this.Create();
            this.VerifyUser();
        }));
        this.socket.on("error", (error) => {
            console.error('Socket.io error:', error);
        });
    }
}
exports.default = Socket;
