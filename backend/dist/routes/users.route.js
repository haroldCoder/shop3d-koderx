"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Users_controllers_1 = __importDefault(require("../controllers/Users.controllers"));
const router = (0, express_1.Router)();
router.route("/api/users")
    .get((req, res) => {
    new Users_controllers_1.default(req, res).viewAllUsers();
})
    .post((req, res) => {
    const usere = req.body;
    new Users_controllers_1.default(req, res).RegisterUser(usere);
});
router.route("/api/user/verify")
    .post((req, res) => {
    const useri = req.body;
    new Users_controllers_1.default(req, res).VerifyUserForApi(useri);
});
router.route("/api/user/:name/:phone")
    .get((req, res) => {
    const { name, phone } = req.params;
    new Users_controllers_1.default(req, res).getIdByPhoneAndNumber(name, phone);
});
module.exports = router;
