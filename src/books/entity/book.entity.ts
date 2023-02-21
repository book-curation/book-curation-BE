import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
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
}
