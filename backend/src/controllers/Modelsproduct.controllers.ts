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
            await this.connect!.execute(`INSERT INTO models(name, description, price, Iduser) VALUES("${model.name}", "${model.description}", "${model.price}", ${model.Iduser})`, (err, result: any)=>{
                if(err){
                    console.log(err);
                    this.res.status(500).send(err)
                    throw err;
                }

                console.log(result);
                new UploadModel(this.req, this.res).updloadModel(result.insertId, model.modeluri!);
            });

            this.res.status(200).send('new model created');
          } catch (err) {
            console.error(err);
            this.res.status(500).send('Error creating model');
          }
    }

    getLastId = () =>{
        this.connect?.execute(`SELECT MAX(Id) as lastid FROM models`, (err, resutl: Array<any>)=>{
            if(err){
                console.log(err);
                this.res.status(500).send(err)
                throw err;
            }
   
            this.res.status(200).json({"lastid": resutl[0]});
        })
    }

    getAuthorByIduser = (Iduser: number) =>{
        this.connect?.execute(`SELECT user.name as user, user.key_stripe, user.email FROM models INNER JOIN user ON models.Iduser = user.Id WHERE Iduser = ${Iduser}`, (err, result: Array<any>)=>{
            if(err){
                console.log(err);
                this.res.status(500).send(err)
                throw err;
            }

            this.res.status(200).json(result[0]);
        })
    }
}

export default ModelsProduct;