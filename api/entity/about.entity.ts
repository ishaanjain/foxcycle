import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class About {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({default: ""})
  public description!: string;

  @Column({default: ""})
  public address!: string;

  @Column({default: ""})
  public phone!: string;

  @Column({default: ""})
  public title!: string;

  @Column({default: ""})
  public imageurl!: string;
}