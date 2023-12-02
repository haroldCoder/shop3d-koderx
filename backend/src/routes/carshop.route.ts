import {Request, Response, Router} from "express";
import Carshop from "../controllers/Carshop.controllers";
const router = Router();


router.route("/api/carshop/:iduser")
.get((req: Request, res: Response)=>{
    const {iduser} = req.params;

    new Carshop(req, res).ViewCarUser(parseInt(iduser));
})

router.route("/api/carshop")
.post((req: Request, res: Response)=>{
    const {iduser, idmodel} = req.body;

    new Carshop(req, res).addModelToCar(parseInt(iduser), parseInt(idmodel));
})

router.route("/api/carshop/exist/:iduser/:idmodel")
.get((req: Request, res: Response)=>{
    const {iduser, idmodel} = req.params;

    new Carshop(req, res).existModelInCarshop(parseInt(iduser), parseInt(idmodel));
})

.delete((req: Request, res: Response)=>{
    const {iduser, idmodel} = req.params;

    new Carshop(req, res).RemoveModelCarshop(parseInt(iduser), parseInt(idmodel));
})

module.exports = router;