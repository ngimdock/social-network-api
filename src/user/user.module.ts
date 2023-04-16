import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models';
import { UserMutationResolver, UserQueriesResolver } from './resolvers';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserMutationResolver, UserQueriesResolver],
  exports: [UserService],
})
export class UserModule {}
