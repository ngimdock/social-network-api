import { Field, ObjectType } from '@nestjs/graphql';
import { Tokens } from 'src/auth/types';

@ObjectType()
export class AuthOutput {
  @Field(() => Tokens)
  tokens: Tokens;
}
