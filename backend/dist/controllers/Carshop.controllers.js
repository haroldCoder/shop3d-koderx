"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connectMysql_1 = __importDefault(require("../connection/connectMysql"));
class Carshop extends connectMysql_1.default {
    constructor(req, res) {
        super();
        this.ViewCarUser = (iduser) => {
            var _a;
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
                        (_a = this.connect) === null || _a === void 0 ? void 0 : _a.execute(`SELECT * FROM models WHERE Id = ${rs.Idproduct}`, (err, result) => {
                            if (err) {
                                console.log(err);
                                reject(err);
                            }
                            else {
                                arrayCarshop.push(result[0]);
                                resolve(result[0]);
                            }
                        });
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
        this.addModelToCar = (idUser, idModel) => {
            var _a;
            (_a = this.connect) === null || _a === void 0 ? void 0 : _a.execute(`INSERT INTO carshop(Iduser, Idproduct) VALUES(${idUser}, ${idModel})`, (err, result) => {
                if (err) {
                    console.log(err);
                    this.res.status(500).send(err);
                    throw err;
                }
                this.res.status(200).send("model add to car");
            });
        };
        this.req = req;
        this.res = res;
    }
}
exports.default = Carshop;
