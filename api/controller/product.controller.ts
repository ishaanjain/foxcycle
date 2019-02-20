import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";

import { getRepository } from "typeorm";
import { Session, Product } from "../entity";
import { request } from "http";

export class ProductController extends DefaultController {
  protected initializeRoutes(): Router {
    const router = Router();
    router
      .route("/products")
      .get((req: Request, res: Response) => {
        const productRepo = getRepository(Product);
        productRepo.find().then((products: Product[]) => {
          res.status(200).send({ products });
        });
      })
      .post((req: Request, res: Response) => {
        const productRepo = getRepository(Product);
        const { name, description, price, imageUrls, stockCount, tags, inStoreOnly } = req.body;
        const product = new Product();
        product.name = name;
        product.description = description;
        product.price = price;
        product.imageUrls = imageUrls;
        product.stockCount = stockCount;
        product.tags = tags;
        product.inStoreOnly = inStoreOnly;
        productRepo.save(product).then(
          createdProduct => {
            res.status(200).send({ createdProduct });
          },
          (reason: any) => {
            res.status(500).send({ reason: "The product could not be added" });
          }
        );
      });
    
    router.route("/products/:id")
    .get((req: Request, res: Response) => {
      const productRepo = getRepository(Product);
      productRepo.findOne(req.params.id).then(
        (product: Product | undefined) => {
          if (product) {
            res.send({ product });
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
        const productRepo = getRepository(Product);
        sessionRepo.findOne(token, {relations: ["user"]}).then((foundSession: Session | undefined) => {
          productRepo.delete({id: req.params.id}).then(deleteResult => {
            res.sendStatus(200);
          });
        });
      })
      .put((req: Request, res: Response) => {
        const productRepo = getRepository(Product);
        productRepo.findOneOrFail(req.params.id).then((foundProduct: Product) => {
            const { name, description, price, imageUrls, stockCount, tags, inStoreOnly } = req.body;
            foundProduct.name = name;
            foundProduct.description = description;
            foundProduct.price = price;
            foundProduct.imageUrls = imageUrls;
            foundProduct.stockCount = stockCount;
            foundProduct.tags = tags;
            foundProduct.inStoreOnly = inStoreOnly;
            productRepo.save(foundProduct).then((updatedProduct: Product) => {
            res.send(200).send({product: updatedProduct});
          });
        });
      });
    return router;
  }

}

export default ProductController;
