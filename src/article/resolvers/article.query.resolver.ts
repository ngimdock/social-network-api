import { Resolver, Query, Args } from '@nestjs/graphql';
import { Article } from '../models';
import { ArticleService } from '../article.service';
import { ArticlePagination, ArticlePaginationArgs } from '../dto';

@Resolver(Article)
export class ArticleQueriesResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Query(() => ArticlePagination)
  async articlesPaginated(
    @Args() args: ArticlePaginationArgs,
  ): Promise<ArticlePagination> {
    return this.articleService.articlesPaginated(args);
  }
}
