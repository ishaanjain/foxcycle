import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  @Column()
  public description!: string;

  @Column()
  public price!: number;

  @Column({default: null})
  public imageUrls!: string;

  @Column({default: 0})
  public stockCount!: number;

  @Column({default: null})
  public tags!: string;

  @Column({default: false})
  public inStoreOnly!: boolean;
}
