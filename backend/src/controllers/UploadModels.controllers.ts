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

    getModels3d = async(name: string) =>{
        const models3d = await this.getMongooseModel().findOne({});

        return models3d;
    }

    updloadModel = async(name: string, model: Buffer | undefined) => {
        try {
            const newmodel = new (this.getMongooseModel())({
                name: name,
                model: model
            })

            await newmodel.save();
        }
        catch(err){
            this.res.status(500).send(err);
        }
    }
}

export default UploadModel;