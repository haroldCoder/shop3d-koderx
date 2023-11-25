import Models3d from "../models/Models3d";
import { Request, Response } from "express"

class UploadModel extends Models3d {
    res: Response;
    req: Request;

    constructor(req: Request, res: Response){
        super();
        this.res = res;
        this.req = req;
    }

    getModels3d = async(id: number) =>{
        const models3d = await this.getMongooseModel().findOne({id: id});

        return models3d;
    }

    updloadModel = async(id: number, model: Buffer | any, modeluri: string) => {
        try {
            const newmodel = new (this.getMongooseModel())({
                id: id,
                model: model,
                modeluri: modeluri
            })

            await newmodel.save();
        }
        catch(err){
            this.res.status(500).send(err);
        }
    }
}

export default UploadModel;