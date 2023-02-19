import { Phrase } from "../../books/entity/phrase.entity";
import { Curation } from "../../curations/entity/curation.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

export enum AccountStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  BLOCKED = "blocked",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  status: AccountStatus;

  @CreateDateColumn()
  registerAt: Date;

  @OneToMany(() => Phrase, (phrase) => phrase.user)
  phrases: Phrase[];

  @OneToMany(() => Curation, (curation) => curation.user)
  curations: Curation[];
}
