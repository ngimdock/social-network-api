import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Tokens {
  @Field(() => String)
  access_token: string;

  @Field(() => String)
  refresh_token: string;
}
