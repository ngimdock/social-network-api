import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AtStrategy, RtStrategy } from './strategies';
import { UserModule } from 'src/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtGuard } from './guards';
import { AuthMutationResolver } from './resolvers';

@Module({
  imports: [JwtModule.register({}), UserModule],
  providers: [
    AuthService,
    AtStrategy,
    RtStrategy,
    { provide: APP_GUARD, useClass: JwtGuard },
    AuthMutationResolver,
  ],
})
export class AuthModule {}
