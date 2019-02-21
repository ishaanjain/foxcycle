import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Announce {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({default: null})
  public description!: string;

  @Column({default: null})
  public imageurl!: string;
}
