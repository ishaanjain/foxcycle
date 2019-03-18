import DefaultController from "./default.controller";
import { Order, Product, ProductOrder, Session } from "../entity";

import isAuthenticated from "./auth";

import { Request, Response, Router } from "express";
import { getRepository } from "typeorm";

export class OrderController extends DefaultController {
  protected initializeRoutes(): Router {
    const router = Router();

    router.route("/orders")
      .get(isAuthenticated(false, false), (req: Request, res: Response) => {
        const orderRepo = getRepository(Order);
        orderRepo.find({
          relations: ["productOrders", "user"]
        }).then((orders: Order[]) => {
          res.status(200).send({ orders });
        }).catch((error: any) => {
          res.status(500).send({ reason: error.message });
        });
      })
      .post(async (req: Request, res: Response) => {
        try {
          const productRepo = getRepository(Product);
          const productOrderRepo = getRepository(ProductOrder);
          const orderRepo = getRepository(Order);
          const order = new Order();
          order.productOrders = [];
          for (let i = 0; i < req.body.productOrders.length; i++) {
            const reqProductOrder = req.body.productOrders[i];
            const product = await productRepo.findOneOrFail(reqProductOrder.productId);
            const productOrder = new ProductOrder();
            productOrder.product = product;
            productOrder.productCount = reqProductOrder.productCount;
            await productOrderRepo.save(productOrder);
            order.productOrders.push(productOrder);
          }
          order.status = "processing"; // can be processing, dispatched, or complete
          order.totalPrice = req.body.totalPrice;
          order.storePickup = req.body.storePickup;
          order.name = req.body.name;
          order.address = req.body.address;
          order.creditCard = req.body.creditCard;
          const createdOrder = await orderRepo.save(order);
          res.status(200).send({ createdOrder });
        } catch (error) {
          res.status(500).send({ reason: error.message });
        }
      });

    router.route("/orders/:id")
      .get((req: Request, res: Response) => {
        const orderRepo = getRepository(Order);
        orderRepo.findOne({
          where: { id: req.params.id },
          relations: ["productOrders", "productOrders.product", "user"]
        }).then((order: Order | undefined) => {
          if (!order) {
            res.sendStatus(404);
            return;
          }
          res.send({ order });
        }).catch((error: any) => {
          res.status(500).send({ reason: error.message });
        });
      })
      .patch(isAuthenticated(false, false), async (req: Request, res: Response) => {
        try {
          const token = req.get("token");
          const orderRepo = getRepository(Order);
          const order = await orderRepo.findOne({ id: req.params.id });
          if (!order) {
            res.status(400).send(`order with id ${req.params.id} not found.`);
            return;
          }
          order.status = req.body.status || order.status;
          if (req.body.assignOrder) {
            const sessionRepo = getRepository(Session);
            const foundSession = await sessionRepo.findOneOrFail(token);
            order.user = foundSession.user;
          }
          orderRepo.save(order).then((updatedOrder: Order) => {
            res.status(200).send({ order: updatedOrder });
          });
        } catch(error) {
          res.status(500).send({ reason: error.message });
        }
      })
      .delete(isAuthenticated(false, true), async (req: Request, res: Response) => {
        try {
          const orderRepo = getRepository(Order);
          const productOrderRepo = getRepository(ProductOrder);
          const order = await orderRepo.findOneOrFail({
            where: { id: req.params.id },
            relations: ["productOrders"]
          });
          await productOrderRepo.delete(order.productOrders);
          const deleteResult = await orderRepo.delete({ id: req.params.id })
          if (deleteResult.raw.affectedRows == 0) {
            res.status(400).send(`order with id ${req.params.id} not found`);
            return;
          }
          res.status(200).send(`order with id ${req.params.id} deleted`);
        } catch (error) {
          res.status(500).send({ reason: error.message });
        }
      });

    return router;
  }
}

export default OrderController;
