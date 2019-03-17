import DefaultController from "./default.controller";

import {Request, Response, Router } from "express";

import { getRepository, getManager} from "typeorm";
import { Time } from "../entity";

export class TimeController extends DefaultController {
  protected initializeRoutes(): Router {
    const router = Router();
    router
    .route("/time")
    .get((req: Request, res: Response) => {
      const TimeRepo = getRepository(Time);
      TimeRepo.find().then((time: Time[]) => {
        res.send({ time });
      }); 
    })
    .put((req: Request, res: Response) => {
      const timeRepo = getRepository(Time);
      timeRepo.findOneOrFail(req.params.dayofweek).then((found: Time) => {
          const { name, dayofweek, start, end} = req.body;
          found.name = name;
          found.dayofweek = dayofweek;
          found.start = start;
          found.end = end;
          timeRepo.save(found).then((updated: Time) => {
            res.status(200).send({time: updated});
        });
      });
    });
    return router;
  }
}

export default TimeController;