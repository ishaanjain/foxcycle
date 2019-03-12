import { 
  Column, 
  Entity, 
  PrimaryGeneratedColumn,
  ManyToMany, 
  JoinTable, 
  Index 
} from "typeorm";
import { Tag } from "./tag.entity";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public name!: string;

  @Column({ length: "2040" })
  public description!: string;

  @Column()
  public price!: number;

  @Column({default: null})
  public imageUrls!: string;

  @Column({default: 0})
  public stockCount!: number;

  @Column({default: null})
  public tagString!: string;

  @ManyToMany(type => Tag, tag => tag.products, { cascade: true, onDelete: "CASCADE" })
  @JoinTable()
  public tags!: Tag[];

  @Column({default: false})
  public inStoreOnly!: boolean;
}
