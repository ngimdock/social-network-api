import { Field, ObjectType } from '@nestjs/graphql';
import { Node } from 'src/pagination/models';
import { User } from 'src/user/models';
import { Column, Entity, JoinColumn, ManyToOne, RelationId } from 'typeorm';

@Entity()
@ObjectType()
export class Article extends Node {
  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String)
  @Column()
  description: string;

  @Field(() => String)
  @Column()
  image: string;

  @ManyToOne(() => User, (user) => user.articles)
  @JoinColumn()
  author: User;

  @RelationId((self: Article) => self.author)
  @Field(() => String)
  readonly authorId: User['id'];
}
