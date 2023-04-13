import { Field, ObjectType } from '@nestjs/graphql';
import { Node } from 'src/pagination/models';
import { Column, Entity } from 'typeorm';

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
}
