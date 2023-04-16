import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './models';
import {
  ArticleFieldsResolver,
  ArticleMutationResolver,
  ArticleQueriesResolver,
} from './resolvers';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Article]), UserModule],
  providers: [
    ArticleService,
    ArticleMutationResolver,
    ArticleQueriesResolver,
    ArticleFieldsResolver,
  ],
})
export class ArticleModule {}
