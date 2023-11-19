import { Request, Response } from "express";
import ConnectMysql from "../connection/connectMysql";
import { Models } from "../interfaces/models";
import UploadModel from "./UploadModels.controllers";


class ModelsProduct extends ConnectMysql {
    req: Request
    res: Response
    constructor(req: Request, res: Response) {
        super();
        this.req = req;
        this.res = res;
    }

    getModels = async () => {
        const mongo: UploadModel = new UploadModel(this.req, this.res);
        await this.connect.query(`SELECT * FROM models`, (err, result: Array<Models>) => {
            if (err) {
                console.error(err);
                return;
            }
            const models3d = result.map(async(md: Models) => {
                const additionalData = { model: await mongo.getModels3d(md.name) };
                return {...md, additionalData}
            })

            this.res.json(models3d);
        });

        
    }

    createModel = async (model: Models) => {
        await this.connect.query(`INSERT INTO model(name, description, price, Iduser) VALUES(${model.name}, ${model.description}, ${model.price}, ${model.Iduser})`, (err, result) => {
            if (err) throw console.log(err);
            const model3d = this.req.file?.buffer;
            new UploadModel(this.req, this.res).updloadModel(model.name, model3d);
            this.res.status(200).send("new model create");
        })
    }
}

export default ModelsProduct;