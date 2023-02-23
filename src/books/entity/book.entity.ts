import { Hashtag } from '../../hashtag/entity/hashtag.entity';
import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Phrase } from '../../phrase/entity/phrase.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

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

  @OneToMany(() => Phrase, phrase => phrase.book)
  phrases: Phrase[];

  @ManyToMany(() => Hashtag, hashtag => hashtag.books)
  hashtag: Hashtag[];
}
