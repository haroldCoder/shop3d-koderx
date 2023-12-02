"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Carshop_controllers_1 = __importDefault(require("../controllers/Carshop.controllers"));
const router = (0, express_1.Router)();
router.route("/api/carshop/:iduser")
    .get((req, res) => {
    const { iduser } = req.params;
    new Carshop_controllers_1.default(req, res).ViewCarUser(parseInt(iduser));
});
router.route("/api/carshop")
    .post((req, res) => {
    const { iduser, idmodel } = req.body;
    new Carshop_controllers_1.default(req, res).addModelToCar(parseInt(iduser), parseInt(idmodel));
});
router.route("/api/carshop/exist/:iduser/:idmodel")
    .get((req, res) => {
    const { iduser, idmodel } = req.params;
    new Carshop_controllers_1.default(req, res).existModelInCarshop(parseInt(iduser), parseInt(idmodel));
})
    .delete((req, res) => {
    const { iduser, idmodel } = req.params;
    new Carshop_controllers_1.default(req, res).RemoveModelCarshop(parseInt(iduser), parseInt(idmodel));
});
module.exports = router;
