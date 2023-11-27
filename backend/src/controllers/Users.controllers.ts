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
        if(!this.verifyUser(User)){
            await this.connect!.execute(`INSERT INTO user(name, email, cell, key_stripe) VALUES (${User.name}, ${User.email}, ${User.cell}, ${User.key_stripe})`, (err, result)=>{
                if(err){
                    console.log(err);
                    this.res.status(500).json(err)
                    throw err;
                }

                this.res.status(200).send("new user register");
            })
        }
        this.res.status(200).json({ msg: false })
    }

    verifyUser = (useri: user): boolean =>{
        this.connect!.execute(`SELECT * FROM user WHERE name="${useri.name}" OR email = "${useri.email}"`, (err, result: Array<user>) => {
            if (err) {
                console.log(err);
                throw err;
            }

            if (result.length > 0) {
                return true
            }
            else {
                return false
            }
        })

        return false;
    }

    VerifyUserForApi = (useri: user) =>{
        this.connect!.execute(`SELECT * FROM user WHERE name="${useri.name}" OR email = "${useri.email}"`, (err, result: Array<user>) => {
            if (err) {
                console.log(err);
                this.res.status(500).json(err);
                throw err;
            }

            if (result.length > 0) {
                this.res.status(200).json({ msg: true })
            }
            else {
                this.res.status(200).json({ msg: false })
            }
        })
    }

    getIdByPhoneAndNumber = (name: string, phone: string) =>{
        this.connect?.execute(`SELECT Id as id FROM user WHERE name="${name}" AND cell="${phone}"`, (err, reult: Array<any>)=>{
            if (err) {
                console.log(err);
                this.res.status(500).json(err);
                throw err;
            }

            this.res.status(200).json(reult[0]);
        })
    }
}

export default Users;