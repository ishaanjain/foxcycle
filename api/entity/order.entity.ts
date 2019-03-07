import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public password!: string;
}
