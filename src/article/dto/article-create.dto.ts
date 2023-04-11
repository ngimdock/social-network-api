import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Article } from '../models';

@InputType()
export class ArticleCreateInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  image: string;
}

@ObjectType()
export class ArticleCreateOutput {
  @Field(() => Article)
  article: Article;
}
