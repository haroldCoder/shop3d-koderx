import ConnectMysql from "../connection/connectMysql";
import Socket from "./Socket.controllers";
import {Express, request, response} from "express";
import { Models } from "../interfaces/models";
import Models3d from "../models/Models3d";

class ModelsSockets extends Socket{
    connectmysql: ConnectMysql;

    constructor(app: Express){
        super(app);
        this.connectmysql = new ConnectMysql();
    }

    SendAll = () : void =>{
        const mongo: Models3d = new Models3d();
        this.connectmysql.connect!.execute(`SELECT * FROM models`, async(err, result: Array<Models>) => {
            if (err) {
                console.error(err);
                return;
            }
            const models3d: Array<any> = new Array<any>();
            await Promise.all(result.map(async (md) => {
                const model3D = await mongo.getMongooseModel().findOne({id: md.Id!});
                
                models3d.push({...md, model: model3D });
            }));
        

            this.socket!.emit("server:models", {models: models3d});
        });
    }

    Create = (): void => {
        this.socket!.on('client:models', (mod: Models)=>{
            this.connectmysql.connect!.execute(`INSERT INTO user(name, description, price, Iduser) VALUES (${mod.name}, ${mod.description}, ${mod.price}, ${mod.Iduser})`, (err, result)=>{
                if(err){
                    console.log(err);
                    throw err;
                }
    
                this.SendAll();
            })
        })
    }

    VerifyUser(): void {
        
    }
}

export default ModelsSockets;