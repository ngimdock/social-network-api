import { Field, ObjectType } from '@nestjs/graphql';
import { Node } from 'src/pagination/models';
import { Column, Entity } from 'typeorm';

@ObjectType()
@Entity()
export class User extends Node {
  @Field(() => String)
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field(() => String)
  @Column()
  firstName: string;

  @Field(() => String)
  @Column()
  lastName: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  avatar?: string;
}
