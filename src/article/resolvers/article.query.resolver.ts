import { Resolver, Query } from '@nestjs/graphql';
import { Article } from '../models';
import { ArticleService } from '../article.service';

@Resolver(Article)
export class ArticleQueriesResolver {
  constructor(private readonly articleService: ArticleService) {}

  @Query(() => [Article])
  async articleList() {
    return this.articleService.articleList();
  }
}
