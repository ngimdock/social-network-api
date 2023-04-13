import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ArticleDeleteOutput {
  @Field(() => ID)
  id: string;
}
