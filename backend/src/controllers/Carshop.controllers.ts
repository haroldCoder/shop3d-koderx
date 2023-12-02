import { Models } from "../interfaces/models";
import ConnectMysql from "../connection/connectMysql";
import { Request, Response } from "express";
import UploadModel from "./UploadModels.controllers";


class Carshop extends ConnectMysql {
    req!: Request;
    res!: Response;

    constructor(req: Request, res: Response) {
        super();
        this.req = req;
        this.res = res;
    }

    ViewCarUser = (iduser: number) => {
        const mongo: UploadModel = new UploadModel(this.req, this.res);
        this.connect?.execute(`SELECT * FROM carshop WHERE Iduser = ${iduser}`, (err, result: Array<any>) => {
            if (err) {
                console.log(err);
                this.res.status(500).send(err)
                throw err;
            }

            const arrayCarshop = Array<any>()

            const promises = result.map((rs) => {
                return new Promise((resolve, reject) => {
                    this.connect?.execute(`SELECT * FROM models WHERE Id = ${rs.Idproduct}`, async(err, result: Array<Models>) => {
                        if (err) {
                            console.log(err);
                            reject(err);
                        } else {
                            const model3D = await mongo.getModels3d(result[0].Id!);
                            arrayCarshop.push({
                                name: result[0].name,
                                description: result[0].description,
                                Iduser: result[0].Iduser,
                                price: result[0].price,
                                model: model3D
                            });
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

    addModelToCar = async(idUser: number, idModel: number) => {
        if (await this.existModelInCarshop(idUser, idModel, true)!) {
            this.connect?.execute(`INSERT INTO carshop(Iduser, Idproduct) VALUES(${idUser}, ${idModel})`, (err, result: Array<Models>) => {
                if (err) {
                    console.log(err);
                    this.res.status(500).send(err)
                    throw err;
                }

                this.res.status(200).send("model add to car")
            })
        }
    }

    existModelInCarshop = (idUser: number, IdModel: number, permision: boolean = false) => {
        return new Promise((resolve, reject) => {
            this.connect?.execute(`SELECT * FROM carshop WHERE Iduser = ${idUser} AND Idproduct = ${IdModel}`, (err, result: Array<any>) => {
                if (err) {
                    console.log(err);
                    reject(err);
                } else {
                    
                    if (result.length > 0) {
                        if (!permision) {
                            this.res.status(200).json({ exist: true });
                        } else {
                            console.log(5);
                            resolve(false);
                        }
                    } else {
                        if (!permision) {
                            this.res.status(200).json({ exist: false });
                        } else {
                            resolve(true);
                        }
                    }
                }
            });
        });
    }
}

export default Carshop;