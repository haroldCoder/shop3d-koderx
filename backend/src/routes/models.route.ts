import {Request, Response, Router} from "express";
const router = Router();
import multer from "multer";
import ModelsProduct from "../controllers/Modelsproduct.controllers";
import { Models } from "../interfaces/models";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.route("/api/models")
  .get((req: Request, res: Response)=>{
    new ModelsProduct(req, res).getModels();
  })
  .post(upload.single('file'), (req: Request, res: Response)=>{
     const model : Models = req.body;
    
     new ModelsProduct(req, res).createModel(model);
  });

router.route("/api/models/lastid")
.get((req: Request, res: Response)=>{
  new ModelsProduct(req, res).getLastId();
})

router.route("/api/model/user/:iduser")
.get((req: Request, res: Response)=>{
  const {iduser} = req.params; 

  new ModelsProduct(req, res).getAuthorByIduser(parseInt(iduser));
})

router.route("/api/model/:Id")
.get((req: Request, res: Response)=>{
  const {Id} = req.params;

  new ModelsProduct(req, res).getModelById(parseInt(Id));
})
.delete((req: Request, res: Response)=>{
  const {Id} = req.params;

  new ModelsProduct(req, res).deleteModel(parseInt(Id));
})

router.route("/api/models/user/prop/:iduser")
.get((req: Request, res: Response)=>{
  const {iduser} = req.params; 

  new ModelsProduct(req, res).getModelsByIduser(parseInt(iduser));
})

module.exports = router;