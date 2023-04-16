import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { ArticleService } from '../article.service';
import {
  ArticleCreateInput,
  ArticleCreateOutput,
  ArticleDeleteOutput,
  ArticleUpdateInput,
  ArticleUpdateOutput,
} from '../dto';
import { Article } from '../models';

@Resolver(Article)
export class ArticleMutationResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Mutation(() => ArticleCreateOutput)
  async articleCreate(@Args('input') input: ArticleCreateInput) {
    return this.articleService.createArticle(input);
  }

  @Mutation(() => ArticleUpdateOutput)
  async articleUpdate(
    @Args({ name: 'articleId', type: () => ID }) id: Article['id'],
    @Args('updateInput') updateInput: ArticleUpdateInput,
  ) {
    return this.articleService.updateArticle(id, updateInput);
  }

  @Mutation(() => ArticleDeleteOutput)
  async articleDelete(
    @Args({ name: 'articleId', type: () => ID }) id: Article['id'],
  ): Promise<ArticleDeleteOutput> {
    return this.articleService.deleteArticle(id);
  }
}
