import { Session } from "../entity";

import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";

export default function isAuthenticated(checkSameUser: boolean, checkAdmin: boolean) {
  return (req: Request, res: Response, next: NextFunction) => {
    const token: string | undefined = req.get("token");
    if (!token) {
      res.sendStatus(401);
      return;
    }
    const sessionRepo = getRepository(Session);
    sessionRepo.findOne(token, {
      relations: ["user"]
    }).then((foundSession: Session | undefined) => {
      if (
        foundSession &&
        (!checkSameUser ||
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