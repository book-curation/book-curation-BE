import { User } from '../../users/entity/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from './book.entity';

@Entity()
export class Phrase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ type: 'timestamptz' })
  createAt: Date;

  @ManyToOne(() => Book, book => book.phrases)
  book: Book;

  @ManyToOne(() => User, user => user.phrases)
  user: User;
}
