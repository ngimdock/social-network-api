import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models';
import {
  UserFieldsResolver,
  UserMutationResolver,
  UserQueriesResolver,
} from './resolvers';
import { ArticleModule } from 'src/article/article.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => ArticleModule)],
  providers: [
    UserService,
    UserMutationResolver,
    UserQueriesResolver,
    UserFieldsResolver,
  ],
  exports: [UserService],
})
export class UserModule {}
