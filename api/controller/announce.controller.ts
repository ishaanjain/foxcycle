import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";
import multer from "multer";
import Path from "path";

import { getRepository } from "typeorm";
import { Session, Announce } from "../entity";

export class AnnounceController extends DefaultController {
  protected initializeRoutes(): Router {
    const router = Router();
    router
      .route("/announce")
      .get((req: Request, res: Response) => {
        const announceRepo = getRepository(Announce);
        announceRepo.find().then((announce: Announce[]) => {
          res.status(200).send({ announce });
        });
      })
      .post((req: Request, res: Response) => {
        const announcement = getRepository(Announce);
        const {description} = req.body;
        const ann = new Announce();
        ann.description = description;
        announcement.save(ann).then(
          createdAnnounce => {
            res.status(200).send({ createdAnnounce });
          }
        );
      });
      return router;
  }
}

export default AnnounceController;
