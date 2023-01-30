import internal from "stream";
import {
  Column,
  Entity,
  OneToMany,
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
  ISBN: string;

  @Column()
  title: string;

  @Column()
  subject: string;

  @Column()
  publisher: string;

  @Column()
  publicationDate: Date;

  @Column()
  language: string;

  @Column()
  numberOfPages: number;

  @Column()
  author: string;

  @OneToMany(() => Phrase, (phrase) => phrase.bookId)
  phrases: Phrase[];

  @OneToMany(() => Hashtag, (hashtag) => hashtag.bookId)
  hashtags: Hashtag[];
}
