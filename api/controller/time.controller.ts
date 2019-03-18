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
      timeRepo.findOneOrFail({name: req.body.name}).then((found: Time) => {
          const { name, start, end, startam, endam} = req.body;
          found.name = name;
          found.start = start;
          found.end = end;
          found.startam = startam;
          found.endam = endam;
          timeRepo.save(found).then((updated: Time) => {
            res.status(200).send({time: updated});
        });
      }).catch((error: any) => {
        const newtime = new Time();
        const { name, start, end, startam, endam} = req.body;
        newtime.name = name;
        newtime.start = start;
        newtime.end = end;
        newtime.startam = startam;
        newtime.endam = endam;
        timeRepo.save(newtime).then((newt: Time) => {
          res.status(200).send({time: newt});
        }).catch((error: any) => {
          res.status(500).send({ reason: error.message });
        });
      });
    });
    return router;
  }
}

export default TimeController;