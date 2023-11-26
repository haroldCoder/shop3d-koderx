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
const Models3d_1 = __importDefault(require("../models/Models3d"));
class UploadModel extends Models3d_1.default {
    constructor(req, res) {
        super();
        this.getModels3d = (id) => __awaiter(this, void 0, void 0, function* () {
            const models3d = yield this.getMongooseModel().findOne({ id: id });
            return models3d;
        });
        this.updloadModel = (id, modeluri) => __awaiter(this, void 0, void 0, function* () {
            try {
                const newmodel = new (this.getMongooseModel())({
                    id: id,
                    modeluri: modeluri
                });
                yield newmodel.save();
            }
            catch (err) {
                this.res.status(500).send(err);
            }
        });
        this.res = res;
        this.req = req;
    }
}
exports.default = UploadModel;
