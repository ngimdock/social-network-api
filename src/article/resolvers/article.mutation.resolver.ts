import { Args, ID, Mutation, Resolver } from '@nestjs/graphql';
import { ArticleService } from '../article.service';
import {
  ArticleCreateInput,
  ArticleCreateOutput,
  ArticleUpdateInput,
} from '../dto';
import { Article } from '../models';

@Resolver(Article)
export class ArticleMutationResolver {
  getArticleId = { name: 'articleId', type: () => ID };

  constructor(private readonly articleService: ArticleService) {}

  @Mutation(() => ArticleCreateOutput)
  async articleCreate(@Args('input') input: ArticleCreateInput) {
    return this.articleService.createArticle(input);
  }

  @Mutation(() => ArticleCreateOutput)
  async articleUpdate(
    @Args({ name: 'articleId', type: () => ID }) id: Article['id'],
    @Args('updateInput') updateInput: ArticleUpdateInput,
  ) {
    return this.articleService.updateArticle(id, updateInput);
  }

  @Mutation(() => ArticleCreateOutput)
  async articleDelete(
    @Args({ name: 'articleId', type: () => ID }) id: Article['id'],
  ) {
    return this.articleService.deleteArticle(id);
  }
}
