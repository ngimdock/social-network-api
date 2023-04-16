import { Module, forwardRef } from '@nestjs/common';
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
  imports: [TypeOrmModule.forFeature([Article]), forwardRef(() => UserModule)],
  providers: [
    ArticleService,
    ArticleMutationResolver,
    ArticleQueriesResolver,
    ArticleFieldsResolver,
  ],

  exports: [ArticleService],
})
export class ArticleModule {}
