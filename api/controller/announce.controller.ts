import DefaultController from "./default.controller";

import {Request, Response, Router } from "express";

import { getRepository } from "typeorm";
import { Announce } from "../entity";

export class AnnounceController extends DefaultController {
  protected initializeRoutes(): Router {
    const router = Router();
    router
      .route("/announce")
      .get((req: Request, res: Response) => {
        const announceRepo = getRepository(Announce);
        announceRepo.find().then((announce: Announce[]) => {
          res.send({ announce });
        }); 
      })
      .post((req: Request, res: Response) => {
        const announcement = getRepository(Announce);
        const {description, title, imageurl} = req.body;
        const ann = new Announce();
        ann.description = description;
        ann.imageurl = imageurl;
        ann.title = title;
        announcement.save(ann).then(
          createdAnnounce => { 
            res.status(200).send({ createdAnnounce });
          }
        );
      })
      .delete((req: Request, res: Response) => {
        const token = req.get("token");
        const Repo = getRepository(Announce);
        Repo.delete({}).then(deleteResult => {
          res.sendStatus(200);
        });
      });
    return router;
  }
} 

export default AnnounceController;
