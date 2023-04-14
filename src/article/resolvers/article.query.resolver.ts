import { Resolver, Query, Args } from '@nestjs/graphql';
import { Article } from '../models';
import { ArticleService } from '../article.service';
import { ArticlePagination, ArticlePaginationArgs } from '../dto';
import { Public } from 'src/auth/decorators';

@Resolver(Article)
export class ArticleQueriesResolver {
  constructor(private readonly articleService: ArticleService) {}

  // @Public()
  @Query(() => ArticlePagination)
  async articlesPaginated(
    @Args() args: ArticlePaginationArgs,
  ): Promise<ArticlePagination> {
    return this.articleService.articlesPaginated(args);
  }
}
