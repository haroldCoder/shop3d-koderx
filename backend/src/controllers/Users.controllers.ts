import { Request, Response } from "express";
import ModelsProduct from "./Modelsproduct.controllers";
import { user } from "../interfaces/users";


class Users extends ModelsProduct{
    constructor(req: Request, res: Response){
        super(req, res);
        this.req = req;
        this.res = res;
    }

    viewAllUsers = async() =>{
        await this.connect!.execute(`SELECT * FROM user`, (err, result : Array<user>)=>{
            if(err){
                console.log(err);
                throw err;
            }

            this.res.status(200).json(result);
        })
    }

    RegisterUser = async(User: user) =>{
        await this.connect!.execute(`INSERT INTO user(name, email, cell, key_stripe) VALUES (${User.name}, ${User.email}, ${User.cell}, ${User.key_stripe})`, (err, result)=>{
            if(err){
                console.log(err);
                throw err;
            }

            this.res.status(200).send("new user register");
        })
    }
}

export default Users;