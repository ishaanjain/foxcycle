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
        const serviceRepo = getRepository(Service);
        serviceRepo.find().then((services: Service []) => {
          res.status(200).send({ services });
        });
      })

      .post((req: Request, res: Response) => {
        const serviceRepo = getRepository(Service);
        const { name, description, price} = req.body;
        const service = new Service();
        service.name = name;
        service.description = description;
        service.price = price;
        serviceRepo.save(service).then(
          createdService => {
            res.status(200).send({ createdService });
          },
          (reason: any) => {
            res.status(500).send({ reason: "The service could not be added" });
          }
        );
      })
      router.route("/services/:id")
      .get((req: Request, res: Response) => {
        const serviceRepo = getRepository(Service);
        serviceRepo.findOne(req.params.id).then(
          (service: Service | undefined) => {
            if (service) {
              res.send({ service });
            } else {
              res.sendStatus(404);
            }
          },
          () => {
            res.sendStatus(404);
          }
        );
      })
      .delete((req: Request, res: Response) => {
        const token = req.get("token");
        const sessionRepo = getRepository(Session);
        const serviceRepo = getRepository(Service);
        sessionRepo.findOne(token, {relations: ["user"]}).then((foundSession: Session | undefined) => {
          serviceRepo.delete({id: req.params.id}).then(deleteResult => {
            res.sendStatus(200);
          });
        });
      })
      .put((req: Request, res: Response) => {
        const serviceRepo = getRepository(Service);
        serviceRepo.findOneOrFail(req.params.id).then((foundService: Service) => {
            const { name, description, price} = req.body;
            foundService.name = name;
            foundService.description = description;
            foundService.price = price;
            serviceRepo.save(foundService).then((updatedService: Service) => {
              res.status(200).send({Service: updatedService});
          });
        });
      });
      return router;
    }
}

