import DefaultController from "./default.controller";

import { NextFunction, Request, Response, Router } from "express";

import { getRepository, createQueryBuilder } from "typeorm";
import { Session, Product, Tag } from "../entity";
import { request } from "http";

export class ProductController extends DefaultController {
  protected initializeRoutes(): Router {
    const router = Router();
    router
      .route("/products")
      .get((req: Request, res: Response) => {
        var filters = req.query.filters;
        var query = getRepository(Product).createQueryBuilder("product");
        query.leftJoinAndSelect("product.tags", "tag");
        if (filters && filters.length > 0) {
          query.where("tag.name = :name", {name: filters[0]});
          for (var i = 1; i < filters.length; i++) {
            query.andWhere("tag.name = :name", {name: filters[i]});
          }
        }
        query.getMany().then((products: Product[]) => {
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
        product.tags = [];
        tags.split(";").forEach(function (tag: string) {
          var t = new Tag();
          t.name = tag;
          product.tags.push(t);
        });
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
        const productRepo = getRepository(Product);
        productRepo.delete({id: req.params.id}).then(deleteResult => {
          res.sendStatus(200);
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
