import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

import { Product } from "./product.entity";

@Entity()
export class ProductOrder {
  @PrimaryGeneratedColumn()
  public id!: number;
  
  @Column()
  public product!: Product;

  @Column()
  public productCount!: number;
}
