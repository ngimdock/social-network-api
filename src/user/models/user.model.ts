import { Field, ObjectType } from '@nestjs/graphql';
import { Article } from 'src/article/models';
import { Node } from 'src/pagination/models';
import { Column, Entity, OneToMany } from 'typeorm';

@ObjectType()
@Entity()
export class User extends Node {
  @Field(() => String)
  @Column({ unique: true })
  email: string;

  @Column()
  hash: string;

  @Column({ nullable: true })
  rtHash?: string;

  @Field(() => String)
  @Column()
  firstName: string;

  @Field(() => String)
  @Column()
  lastName: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  avatar?: string;

  @OneToMany(() => Article, (article) => article.author)
  articles: Article[];
}
