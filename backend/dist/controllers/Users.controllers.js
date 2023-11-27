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
const Modelsproduct_controllers_1 = __importDefault(require("./Modelsproduct.controllers"));
class Users extends Modelsproduct_controllers_1.default {
    constructor(req, res) {
        super(req, res);
        this.viewAllUsers = () => __awaiter(this, void 0, void 0, function* () {
            yield this.connect.execute(`SELECT * FROM user`, (err, result) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
                this.res.status(200).json(result);
            });
        });
        this.RegisterUser = (User) => __awaiter(this, void 0, void 0, function* () {
            if (!this.verifyUser(User)) {
                yield this.connect.execute(`INSERT INTO user(name, email, cell, key_stripe) VALUES (${User.name}, ${User.email}, ${User.cell}, ${User.key_stripe})`, (err, result) => {
                    if (err) {
                        console.log(err);
                        this.res.status(500).json(err);
                        throw err;
                    }
                    this.res.status(200).send("new user register");
                });
            }
            this.res.status(200).json({ msg: false });
        });
        this.verifyUser = (useri) => {
            this.connect.execute(`SELECT * FROM user WHERE name="${useri.name}" OR email = "${useri.email}"`, (err, result) => {
                if (err) {
                    console.log(err);
                    throw err;
                }
                if (result.length > 0) {
                    return true;
                }
                else {
                    return false;
                }
            });
            return false;
        };
        this.VerifyUserForApi = (useri) => {
            this.connect.execute(`SELECT * FROM user WHERE name="${useri.name}" OR email = "${useri.email}"`, (err, result) => {
                if (err) {
                    console.log(err);
                    this.res.status(500).json(err);
                    throw err;
                }
                if (result.length > 0) {
                    this.res.status(200).json({ msg: true });
                }
                else {
                    this.res.status(200).json({ msg: false });
                }
            });
        };
        this.getIdByPhoneAndNumber = (name, phone) => {
            var _a;
            (_a = this.connect) === null || _a === void 0 ? void 0 : _a.execute(`SELECT Id as id FROM user WHERE name="${name}" AND cell="${phone}"`, (err, reult) => {
                if (err) {
                    console.log(err);
                    this.res.status(500).json(err);
                    throw err;
                }
                this.res.status(200).json(reult[0]);
            });
        };
        this.req = req;
        this.res = res;
    }
}
exports.default = Users;
