import DefaultController from "./default.controller";

import {Request, Response, Router } from "express";

import { getRepository } from "typeorm";
import { About } from "../entity";

export class AboutController extends DefaultController {
  protected initializeRoutes(): Router {
    const router = Router();
    router
      .route("/about")
      .get((req: Request, res: Response) => {
        const announceRepo = getRepository(About);
        announceRepo.find().then((announce: About[]) => {
          res.send({ announce });
        }); 
      })
      .post((req: Request, res: Response) => {
        const announcement = getRepository(About);
        const {description, title, imageurl, phone, address} = req.body;
        const ann = new About();
        ann.description = description;
        ann.imageurl = imageurl;
        ann.title = title;
        ann.phone = phone;
        ann.address = address;
        announcement.save(ann).then(
          createdAnnounce => { 
            res.status(200).send({ createdAnnounce });
          }
        );
      })
      .delete((req: Request, res: Response) => {
        const token = req.get("token");
        const Repo = getRepository(About);
        Repo.delete({}).then(deleteResult => {
          res.sendStatus(200);
        });
      });
    return router;
  }
} 

export default AboutController;
