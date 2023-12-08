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
class ModelsProduct extends connectMysql_1.default {
    constructor(req, res) {
        super();
        this.getModels = () => __awaiter(this, void 0, void 0, function* () {
            const mongo = new UploadModels_controllers_1.default(this.req, this.res);
            yield (yield this.connect).execute(`SELECT * FROM models`, (err, result) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    console.error(err);
                    return;
                }
                const models3d = new Array();
                yield Promise.all(result.map((md) => __awaiter(this, void 0, void 0, function* () {
                    const model3D = yield mongo.getModels3d(md.Id);
                    models3d.push(Object.assign(Object.assign({}, md), { model: model3D }));
                })));
                this.res.json(models3d);
            }));
        });
        this.createModel = (model) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.connect.execute(`INSERT INTO models(name, description, price, Iduser) VALUES("${model.name}", "${model.description}", "${model.price}", ${model.Iduser})`, (err, result) => {
                    if (err) {
                        console.log(err);
                        this.res.status(500).send(err);
                        throw err;
                    }
                    console.log(result);
                    new UploadModels_controllers_1.default(this.req, this.res).updloadModel(result.insertId, model.modeluri);
                });
                this.res.status(200).send('new model created');
            }
            catch (err) {
                console.error(err);
                this.res.status(500).send('Error creating model');
            }
        });
        this.getLastId = () => {
            var _a;
            (_a = this.connect) === null || _a === void 0 ? void 0 : _a.execute(`SELECT MAX(Id) as lastid FROM models`, (err, resutl) => {
                if (err) {
                    console.log(err);
                    this.res.status(500).send(err);
                    throw err;
                }
                this.res.status(200).json({ "lastid": resutl[0] });
            });
        };
        this.getAuthorByIduser = (Iduser) => {
            var _a;
            (_a = this.connect) === null || _a === void 0 ? void 0 : _a.execute(`SELECT user.name as user, user.key_stripe, user.email FROM models INNER JOIN user ON models.Iduser = user.Id WHERE Iduser = ${Iduser}`, (err, result) => {
                if (err) {
                    console.log(err);
                    this.res.status(500).send(err);
                    throw err;
                }
                this.res.status(200).json(result[0]);
            });
        };
        this.getModelById = (Id) => {
            var _a;
            const mongo = new UploadModels_controllers_1.default(this.req, this.res);
            (_a = this.connect) === null || _a === void 0 ? void 0 : _a.execute(`SELECT * FROM models WHERE Id = ${Id}`, (err, result) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    console.log(err);
                    this.res.status(500).send(err);
                    throw err;
                }
                const models3d = new Array();
                yield Promise.all(result.map((md) => __awaiter(this, void 0, void 0, function* () {
                    const model3D = yield mongo.getModels3d(md.Id);
                    models3d.push(Object.assign(Object.assign({}, md), { model: model3D }));
                })));
                this.res.json(models3d[0]);
            }));
        };
        this.getModelsByIduser = (idUser) => {
            var _a;
            const mongo = new UploadModels_controllers_1.default(this.req, this.res);
            (_a = this.connect) === null || _a === void 0 ? void 0 : _a.execute(`SELECT * FROM models WHERE Iduser = ${idUser}`, (err, result) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    console.log(err);
                    this.res.status(500).send(err);
                    throw err;
                }
                const models3d = new Array();
                yield Promise.all(result.map((md) => __awaiter(this, void 0, void 0, function* () {
                    const model3D = yield mongo.getModels3d(md.Id);
                    models3d.push(Object.assign(Object.assign({}, md), { model: model3D }));
                })));
                this.res.json(models3d);
            }));
        };
        this.deleteModel = (idmodel) => {
            var _a;
            (_a = this.connect) === null || _a === void 0 ? void 0 : _a.execute(`DELETE FROM models WHERE Id = ${idmodel}`, (err, result) => {
                if (err) {
                    console.log(err);
                    this.res.status(500).send(err);
                    throw err;
                }
                this.res.status(200).send("model remove");
            });
        };
        this.req = req;
        this.res = res;
    }
}
exports.default = ModelsProduct;
