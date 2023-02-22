import { User } from '../../users/entity/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Book } from '../../books/entity/book.entity';

@Entity()
export class Phrase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @CreateDateColumn()
  createAt: Date;

  @ManyToOne(() => Book, book => book.phrases, { eager: true })
  @JoinColumn()
  book: Book;

  @ManyToOne(() => User, user => user.phrases, { eager: true })
  @JoinColumn()
  user: User;
}
