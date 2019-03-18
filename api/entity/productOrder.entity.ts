import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

import { Product } from "./product.entity";
import { Order } from "./order.entity";

@Entity()
export class ProductOrder {
  @PrimaryGeneratedColumn()
  public id!: number;
  
  @ManyToOne(type => Product, product => product.productOrders)
  public product!: Product;

  @Column()
  public productCount!: number;
  
  @ManyToOne(type => Order, order => order.productOrders)
  public order!: Order;
}
