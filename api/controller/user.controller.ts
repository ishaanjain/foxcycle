import DefaultController from "./default.controller";
import { User } from "../entity";

import isAuthenticated from "./auth";

import { Request, Response, Router } from "express";
import multer from "multer";
import Path from "path";
import { getRepository } from "typeorm";

export class UserController extends DefaultController {
  protected initializeRoutes(): Router {
    const router = Router();

    router.route("/users")
    .get(isAuthenticated(false, true), (req: Request, res: Response) => {
      const userRepo = getRepository(User);
      const queryString = `
        CAST(user.id AS CHAR) LIKE :id AND
        user.firstName LIKE :firstName AND
        user.lastName LIKE :lastName AND
        user.emailAddress LIKE :emailAddress`;
      const queryVars = {
        id: `%${req.query.id || ''}%`, 
        firstName: `%${req.query.firstName}%`,
        lastName: `%${req.query.lastName}%`,
        emailAddress: `%${req.query.emailAddress}%`,
      };
      userRepo.createQueryBuilder('user').where(queryString, queryVars).getMany()
      .then((users: User[]) => {
        res.status(200).send({ users });
      }).catch((error: any) => {
        res.status(500).send({ reason: error.message });
      });
    })
    .post(isAuthenticated(false, true), (req: Request, res: Response) => {
      const userRepo = getRepository(User);
      const user = new User();
      user.emailAddress = req.body.emailAddress;
      user.password = req.body.password;
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      user.isAdmin = req.body.isAdmin;
      userRepo.save(user).then(createdUser => {
        res.status(200).send({ createdUser });
      }).catch((error: any) => {
        res.status(500).send({ reason: error.message });
      });
    });

    router.route("/users/:id")
    .get(isAuthenticated(true, false), (req: Request, res: Response) => {
      const userRepo = getRepository(User);
      userRepo.findOne(req.params.id).then((user: User | undefined) => {
        if (!user) {
          res.sendStatus(404);
          return;
        }
        res.send({ user });
      }).catch((error: any) => {
        res.status(500).send({ reason: error.message });
      });
    })
    .post(isAuthenticated(true, false), multer({
      dest: Path.join(__dirname, "..", "public", "profilePhotos")
    }).single("profilePhoto"), (req: Request, res: Response) => {
      const userRepo = getRepository(User);
      userRepo.findOne(req.params.id).then((user: User | undefined) => {
        if (!user) {
          res.sendStatus(404);
          return;
        }
        if (!req.file) {
          res.sendStatus(400);
          return;
        }
        user.profileUrl = `profilePhotos/${req.file.filename}`;
        userRepo.save(user).then((savedUser: User) => {
          res.send({ user: savedUser });
        });
      }).catch((error: any) => {
        res.status(500).send({ reason: error.message });
      });
    })
    .patch(isAuthenticated(false, true), (req: Request, res: Response) => {
      const userRepo = getRepository(User);
      userRepo.findOne({ id: req.params.id }).then((user: User | undefined) => {
        if (!user) {
          res.status(400).send(`user with id ${req.params.id} not found.`);
          return;
        }
        user.isAdmin = req.body.isAdmin;
        userRepo.save(user).then((updatedUser: User) => {
          res.status(200).send({user: updatedUser});
        });
      }).catch((error: any) => {
        res.status(500).send({ reason: error.message });
      });
    })
    .delete(isAuthenticated(false, true), (req: Request, res: Response) => {
      const userRepo = getRepository(User);
      userRepo.delete({ id: req.params.id }).then((deleteResult: any) => {
        if (deleteResult.raw.affectedRows == 0) {
          res.status(400).send(`user with id ${req.params.id} not found.`);
          return;
        }
        res.status(200).send("Success");
      }).catch((error: any) => {
        res.status(500).send({ reason: error.message });
      });
    });

    return router;
  }
}

export default UserController;
