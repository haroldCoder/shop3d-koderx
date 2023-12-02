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
const UploadModels_controllers_1 = __importDefault(require("./UploadModels.controllers"));
class Carshop extends connectMysql_1.default {
    constructor(req, res) {
        super();
        this.ViewCarUser = (iduser) => {
            var _a;
            const mongo = new UploadModels_controllers_1.default(this.req, this.res);
            (_a = this.connect) === null || _a === void 0 ? void 0 : _a.execute(`SELECT * FROM carshop WHERE Iduser = ${iduser}`, (err, result) => {
                if (err) {
                    console.log(err);
                    this.res.status(500).send(err);
                    throw err;
                }
                const arrayCarshop = Array();
                const promises = result.map((rs) => {
                    return new Promise((resolve, reject) => {
                        var _a;
                        (_a = this.connect) === null || _a === void 0 ? void 0 : _a.execute(`SELECT * FROM models WHERE Id = ${rs.Idproduct}`, (err, result) => __awaiter(this, void 0, void 0, function* () {
                            if (err) {
                                console.log(err);
                                reject(err);
                            }
                            else {
                                const model3D = yield mongo.getModels3d(result[0].Id);
                                arrayCarshop.push({
                                    name: result[0].name,
                                    description: result[0].description,
                                    Iduser: result[0].Iduser,
                                    price: result[0].price,
                                    model: model3D
                                });
                                resolve(result[0]);
                            }
                        }));
                    });
                });
                Promise.all(promises)
                    .then((results) => {
                    this.res.status(200).json(arrayCarshop);
                })
                    .catch((err) => {
                    this.res.status(500).send(err);
                });
            });
        };
        this.addModelToCar = (idUser, idModel) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            if (yield this.existModelInCarshop(idUser, idModel, true)) {
                (_a = this.connect) === null || _a === void 0 ? void 0 : _a.execute(`INSERT INTO carshop(Iduser, Idproduct) VALUES(${idUser}, ${idModel})`, (err, result) => {
                    if (err) {
                        console.log(err);
                        this.res.status(500).send(err);
                        throw err;
                    }
                    this.res.status(200).send("model add to car");
                });
            }
        });
        this.existModelInCarshop = (idUser, IdModel, permision = false) => {
            return new Promise((resolve, reject) => {
                var _a;
                (_a = this.connect) === null || _a === void 0 ? void 0 : _a.execute(`SELECT * FROM carshop WHERE Iduser = ${idUser} AND Idproduct = ${IdModel}`, (err, result) => {
                    if (err) {
                        console.log(err);
                        reject(err);
                    }
                    else {
                        if (result.length > 0) {
                            if (!permision) {
                                this.res.status(200).json({ exist: true });
                            }
                            else {
                                console.log(5);
                                resolve(false);
                            }
                        }
                        else {
                            if (!permision) {
                                this.res.status(200).json({ exist: false });
                            }
                            else {
                                resolve(true);
                            }
                        }
                    }
                });
            });
        };
        this.req = req;
        this.res = res;
    }
}
exports.default = Carshop;
