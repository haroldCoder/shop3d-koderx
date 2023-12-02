import {Request, Response, Router} from "express";
import { user } from "../interfaces/users";
import Users from "../controllers/Users.controllers";

const router = Router();

router.route("/api/users")
.get((req: Request, res: Response)=>{
    new Users(req, res).viewAllUsers();
})

.post((req: Request, res: Response)=>{
    const usere: user = req.body;

    new Users(req, res).RegisterUser(usere);
})

router.route("/api/user/verify")
.post((req: Request, res: Response)=>{
    const useri: user = req.body;

    new Users(req, res).VerifyUserForApi(useri);
})

router.route("/api/user/:name/:phone")
.get((req: Request, res: Response)=>{
    const {name, phone} = req.params;
    new Users(req, res).getIdByPhoneAndNumber(name, phone);
})

router.route("/api/user/:id")
.get((req: Request, res: Response)=>{
    const {id} = req.params;

    new Users(req, res).getDatauserById(parseInt(id));
})

module.exports = router;