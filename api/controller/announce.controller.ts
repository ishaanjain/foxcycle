import DefaultController from "./default.controller";

import {Request, Response, Router } from "express";

import { getRepository } from "typeorm";
import { Announce } from "../entity";

export class AnnounceController extends DefaultController {
  protected initializeRoutes(): Router {
    const router = Router();
    router
      .route("/announce")
      .get((res: Response) => {
        const announceRepo = getRepository(Announce);
        announceRepo.find().then((announce: Announce[]) => {
          res.status(200).send({ announce });
        });
      })
      .post((req: Request, res: Response) => {
        const announcement = getRepository(Announce);
        announcement.delete([]).then( make => {
          const {description, url} = req.body;
          const ann = new Announce();
          ann.description = description;
          ann.imageurl = url;
          announcement.save(ann).then(
            createdAnnounce => {
              res.status(200).send({ createdAnnounce });
            }
        );
        });
      });
    return router;
  }
}

export default AnnounceController;
