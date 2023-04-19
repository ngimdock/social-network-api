import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { User } from '../models';
import { ArticleService } from 'src/article/article.service';
import { Article } from 'src/article/models';

@Resolver(User)
export class UserFieldsResolver {
  constructor(private readonly articleService: ArticleService) {}

  @ResolveField(() => [Article])
  async articles(@Parent() user: User) {
    const userArticles = await this.articleService.articlesForUser(user.id);

    return userArticles;
  }
}
