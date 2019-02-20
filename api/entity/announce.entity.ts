import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Announce {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column()
  public description!: string;
}
