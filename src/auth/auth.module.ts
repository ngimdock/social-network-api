import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';

import { UserModule } from 'src/user/user.module';
import { AuthMutationResolver } from './resolvers';

@Module({
  imports: [UserModule],
  providers: [AuthService, AuthMutationResolver],
})
export class AuthModule {}
