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

module.exports = router;