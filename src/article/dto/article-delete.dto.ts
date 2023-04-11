import { Field, ID } from '@nestjs/graphql';

export class ArticleDeleteDto {
  @Field(() => ID)
  id: string;
}
