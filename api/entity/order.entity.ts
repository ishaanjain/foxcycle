import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";

import { ProductOrder } from "./productOrder.entity";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public status!: string;

  @OneToMany(type => ProductOrder, productOrder => productOrder.order)
  public productOrders!: ProductOrder[];

  @Column()
  public totalPrice!: number;

  @Column()
  public storePickup!: boolean;

  @Column()
  public name!: string;

  @Column()
  public address!: string;

  @Column()
  public creditCard!: string;
}
