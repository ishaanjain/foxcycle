import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

import { ProductOrder } from "./productOrder.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  public id!: number;

//   @Column()
//   public productOrders!: ProductOrder[];

  @Column()
  public status!: number;
}
