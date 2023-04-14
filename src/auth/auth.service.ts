import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { Tokens } from './types';
import { ConfigService } from '@nestjs/config';
import { AuthLoginInput, AuthRegisterInput } from './dto';

import { UserService } from 'src/user/user.service';

import { UserCreateData } from 'src/user/types';
import { CredentialsIncorrectException } from 'src/user/exceptions';

@Injectable()
export class AuthService {
  constructor(
    private config: ConfigService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async localRegister(registerInput: AuthRegisterInput): Promise<Tokens> {
    const { email, password, firstName, lastName } = registerInput;

    const hash = await argon2.hash(password);

    const createUserData: UserCreateData = {
      email,
      hash,
      firstName,
      lastName,
    };

    const userData = await this.userService.userCreate(createUserData);

    const { user } = userData;

    const tokens = await this.generateTokens(user.id, user.email);

    await this.userService.userUpdateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async localLogin(loginInput: AuthLoginInput): Promise<Tokens> {
    const user = await this.userService.userGetByEmail(loginInput.email);

    if (!user) throw new NotFoundException('User not found');

    const isPasswordMatched = await argon2.verify(
      user.hash,
      loginInput.password,
    );

    if (!isPasswordMatched) throw new CredentialsIncorrectException();

    const tokens = await this.generateTokens(user.id, user.email);

    await this.userService.userUpdateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }

  async logout(userId: string) {
    const data = await this.userService.userUpdateRtHash(userId, null);

    return data;
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.userService.userGetById(userId);

    if (!user.rtHash) throw new ForbiddenException('Acces denied');

    const isRtMatched = await argon2.verify(user.rtHash, refreshToken);

    if (!isRtMatched) throw new ForbiddenException('Acces denied');

    const tokens = await this.generateTokens(user.id, user.email);

    await this.userService.userUpdateRtHash(user.id, refreshToken);

    return tokens;
  }

  private async generateTokens(userId: string, email: string): Promise<Tokens> {
    const payload = { sub: userId, email };

    const [access_token, refresh_token] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.config.get('JWT_SECRET'),
        expiresIn: '1d',
      }),

      this.jwtService.signAsync(payload, {
        secret: this.config.get('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return { access_token, refresh_token };
  }
}
