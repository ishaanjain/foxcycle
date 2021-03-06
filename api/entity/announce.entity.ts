import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Announce {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({default: ""})
  public description!: string;

  @Column({default: ""})
  public title!: string;

  @Column({default: ""})
  public imageurl!: string;
}
 