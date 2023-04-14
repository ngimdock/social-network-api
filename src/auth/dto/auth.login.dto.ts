import { Field, InputType } from '@nestjs/graphql';
@InputType()
export class AuthLoginInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
