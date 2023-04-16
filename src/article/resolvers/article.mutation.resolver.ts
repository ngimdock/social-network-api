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
import { CurrentUser } from 'src/auth/decorators';
import { JwtPayloadType } from 'src/auth/types';

@Resolver(Article)
export class ArticleMutationResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Mutation(() => ArticleCreateOutput)
  async articleCreate(
    @CurrentUser() currentUser: JwtPayloadType,
    @Args('input') input: ArticleCreateInput,
  ) {
    return this.articleService.createArticle(currentUser, input);
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
