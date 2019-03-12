import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";

import { getRepository, createQueryBuilder } from "typeorm";
import { Session, Service } from "../entity";
import { request } from "http";

export class ServiceController extends DefaultController {
  protected initializeRoutes(): Router {
    const router = Router();
    router
      .route("/services")
      .get((req: Request, res: Response) => {
        const userRepo = getRepository(Service);
        userRepo.find().then((services: Service []) => {
          res.status(200).send({ services });
        });
      })
      return router;
    }
}

