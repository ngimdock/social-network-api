import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { User } from '../models';

@InputType()
export class UserCreateInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;

  @Field(() => String, { nullable: true })
  avatar?: string;
}

@ObjectType()
export class UserCreateOutput {
  @Field(() => User)
  user: User;
}
