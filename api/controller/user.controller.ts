import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";
import multer from "multer";
import Path from "path";

import { getRepository } from "typeorm";
import { Session, User } from "../entity";

export class UserController extends DefaultController {
  protected initializeRoutes(): Router {
    const router = Router();

    router.route("/users")
    .get((req: Request, res: Response) => {
      const userRepo = getRepository(User);
      userRepo.find().then((users: User[]) => {
        res.status(200).send({ users });
      });
    })
    .post((req: Request, res: Response) => {
      const userRepo = getRepository(User);
      const user = new User();
      user.emailAddress = req.body.emailAddress;
      user.password = req.body.password;
      user.firstName = req.body.firstName;
      user.lastName = req.body.lastName;
      userRepo.save(user).then(
        createdUser => {
          res.status(200).send({ createdUser });
        },
        (reason: any) => {
          res.status(500).send({ reason: "The email was not unique" });
        }
      );
    });

    router.route("/users/:id")
    .get((req: Request, res: Response) => {
      const userRepo = getRepository(User);
      userRepo.findOne(req.params.id).then(
        (user: User | undefined) => {
          if (user) {
            res.send({ user });
          } else {
            res.sendStatus(404);
          }
        },
        () => {
          res.sendStatus(404);
        }
      );
    })
    .post(this.isAuthenticated(true, false), multer({
      dest: Path.join(__dirname, "..", "public", "profilePhotos")
    }).single("profilePhoto"), (req: Request, res: Response) => {
      const userRepo = getRepository(User);
      userRepo.findOne(req.params.id).then((user: User | undefined) => {
        if (!user) {
          res.sendStatus(500);
          return;
        }
        if (!req.file) {
          res.sendStatus(500);
          return;
        }
        user.profileUrl = `profilePhotos/${req.file.filename}`;
        userRepo.save(user).then((savedUser: User) => {
          res.send({ user: savedUser });
        });
      });
    });

    return router;
  }

  protected isAuthenticated(checkSameUser: boolean, checkAdmin: boolean) {
    return (req: Request, res: Response, next: NextFunction) => {
      const token: string | undefined = req.get("token");
      if (!token) {
        res.sendStatus(401);
        return;
      }
      const sessionRepo = getRepository(Session);
      sessionRepo.findOne(token, { relations: ["user"] })
      .then((foundSession: Session | undefined) => {
        if (
          foundSession &&
          (
            !checkSameUser || 
            foundSession.user.id === parseInt(req.params.id, 10)
          ) &&
          (!checkAdmin || foundSession.user.isAdmin) &&
          (foundSession.expiresAt.getTime() > new Date().getTime())
        ) {
          next();
        } else {
          res.sendStatus(403);
        }
      });
    };
  }
}

export default UserController;
