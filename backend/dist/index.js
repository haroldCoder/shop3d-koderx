"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const security_middleware_1 = __importDefault(require("./middleware/security.middleware"));
const connectMysql_1 = __importDefault(require("./connection/connectMysql"));
const connectMongodb_1 = __importDefault(require("./connection/connectMongodb"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
const authMiddleware = new security_middleware_1.default(process.env.APP_KEY);
const mysqlconnect = new connectMysql_1.default();
const mongodbconnect = new connectMongodb_1.default();
// const socket : Socket = new UsersSockets(app);
// const socket2 : Socket = new ModelsSockets(app);
app.use("/", authMiddleware.authenticate.bind(authMiddleware), require("./routes/models.route"));
app.use("/", authMiddleware.authenticate.bind(authMiddleware), require("./routes/users.route"));
app.listen(process.env.PORT, () => {
    console.log(`Server on port ${process.env.PORT}`);
    mysqlconnect.connectDB();
    mongodbconnect.connectDB();
});
// socket.Server!.listen(parseInt(process.env.PORT!)+1);
// socket2.Server!.listen(parseInt(process.env.PORT!)+2)
