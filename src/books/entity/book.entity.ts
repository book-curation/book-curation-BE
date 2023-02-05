import internal from "stream";
import {
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Hashtag } from "./hashtag.entity";
import { Phrase } from "./phrase.entity";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: Number;

  @Column()
  isbn: string;

  @Column()
  title: string;

  @Column()
  subject: string;

  @Column()
  publisher: string;

  @Column()
  author: string;

  @OneToOne(() => Phrase, (phrase) => phrase.book)
  phrase: Phrase;
}
