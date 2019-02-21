import DefaultController from "./default.controller";

import {Request, Response, Router } from "express";

import { getRepository, getManager} from "typeorm";
import { Time } from "../entity";

export class TimeController extends DefaultController {
  protected initializeRoutes(): Router {
    const router = Router();
    router
      .route("/time")
      .get((res: Response) => {
        const timeRepo = getRepository(Time);
        timeRepo.find().then((time: Time[]) => {
          res.status(200).send({ time });
        });
      })
      .post((req: Request, res: Response) => {
        const ti = getRepository(Time);
        ti.delete([]).then( make => {
          const man = getManager();
          const time = man.create(Time, req.body);
          man.save(time).then(
            maketime => {
              res.status(200).send({ maketime });
            }
        );
        });
      });
    return router;
  }
}

export default TimeController;