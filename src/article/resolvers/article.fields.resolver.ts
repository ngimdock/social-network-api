import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Article } from '../models';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/models';

@Resolver(Article)
export class ArticleFieldsResolver {
  constructor(private readonly userService: UserService) {}

  @ResolveField(() => User)
  async author(@Parent() article: Article) {
    if (!article.authorId) return null;

    try {
      return this.userService.userGetById(article.authorId);
    } catch (e) {
      return null;
    }
  }
}
