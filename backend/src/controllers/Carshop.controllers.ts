import { Models } from "mongoose";
import ConnectMysql from "../connection/connectMysql";
import { Request, Response } from "express";


class Carshop extends ConnectMysql{
    req!: Request;
    res!: Response;

    constructor(req: Request, res: Response){
        super();
        this.req = req;
        this.res = res;
    }

    ViewCarUser = (iduser: number) =>{
        this.connect?.execute(`SELECT * FROM carshop WHERE Iduser = ${iduser}`, (err, result: Array<any>)=>{
            if(err){
                console.log(err);
                this.res.status(500).send(err)
                throw err;
            }
            
            const arrayCarshop = Array<Models>()

            const promises = result.map((rs) => {
                return new Promise((resolve, reject) => {
                    this.connect?.execute(`SELECT * FROM models WHERE Id = ${rs.Idproduct}`, (err, result: Array<Models>) => {
                        if (err) {
                            console.log(err);
                            reject(err);
                        } else {
                            arrayCarshop.push(result[0]);
                            resolve(result[0]);
                        }
                    });
                });
            });
            
            Promise.all(promises)
                .then((results) => {
                    this.res.status(200).json(arrayCarshop);
                })
                .catch((err) => {
                    this.res.status(500).send(err);
                });
            
        })
    }

    addModelToCar = (idUser: number, idModel: number) =>{
        this.connect?.execute(`INSERT INTO carshop(Iduser, Idproduct) VALUES(${idUser}, ${idModel})`, (err, result: Array<Models>)=>{
            if(err){
                console.log(err);
                this.res.status(500).send(err)
                throw err;
            }

            this.res.status(200).send("model add to car")
        })
    }
}

export default Carshop;