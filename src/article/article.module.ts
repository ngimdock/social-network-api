import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './models';
import { ArticleMutationResolver, ArticleQueriesResolver } from './resolvers';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  providers: [ArticleService, ArticleMutationResolver, ArticleQueriesResolver],
})
export class ArticleModule {}
