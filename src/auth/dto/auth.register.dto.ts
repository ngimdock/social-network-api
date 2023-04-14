import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class AuthRegisterInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String)
  firstName: string;

  @Field(() => String)
  lastName: string;
}
