"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const multer_1 = __importDefault(require("multer"));
const Modelsproduct_controllers_1 = __importDefault(require("../controllers/Modelsproduct.controllers"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage: storage });
router.route("/api/models")
    .get((req, res) => {
    new Modelsproduct_controllers_1.default(req, res).getModels();
})
    .post(upload.single('file'), (req, res) => {
    const model = req.body;
    new Modelsproduct_controllers_1.default(req, res).createModel(model);
});
router.route("/api/models/lastid")
    .get((req, res) => {
    new Modelsproduct_controllers_1.default(req, res).getLastId();
});
router.route("/api/model/user/:iduser")
    .get((req, res) => {
    const { iduser } = req.params;
    new Modelsproduct_controllers_1.default(req, res).getAuthorByIduser(parseInt(iduser));
});
router.route("/api/model/:Id")
    .get((req, res) => {
    const { Id } = req.params;
    new Modelsproduct_controllers_1.default(req, res).getModelById(parseInt(Id));
})
    .delete((req, res) => {
    const { Id } = req.params;
    new Modelsproduct_controllers_1.default(req, res).deleteModel(parseInt(Id));
});
router.route("/api/models/user/prop/:iduser")
    .get((req, res) => {
    const { iduser } = req.params;
    new Modelsproduct_controllers_1.default(req, res).getModelsByIduser(parseInt(iduser));
});
module.exports = router;
