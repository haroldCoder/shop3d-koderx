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
        await (await this.connect!).execute(`SELECT * FROM models`, async(err, result: Array<Models>) => {
            if (err) {
                console.error(err);
                return;
            }
            const models3d: Array<any> = new Array<any>();
            await Promise.all(result.map(async (md) => {
                const model3D = await mongo.getModels3d(md.Id!);
                
                models3d.push({...md, model: model3D });
            }));
            

            this.res.json(models3d);
        });

        
    }

    createModel = async (model: Models) => {
        try {
            const result : any = await this.connect!.execute(
              'INSERT INTO models(name, description, price, Iduser) VALUES(?, ?, ?, ?)',
               [model.name, model.description, model.price, model.Iduser]
            );

            const model3d = this.req.file?.buffer;
            
            new UploadModel(this.req, this.res).updloadModel(result[0]?.insertId, model.modeluri!);
      
            this.res.status(200).send('new model created');
          } catch (err) {
            console.error(err);
            this.res.status(500).send('Error creating model');
          }
    }
}

export default ModelsProduct;