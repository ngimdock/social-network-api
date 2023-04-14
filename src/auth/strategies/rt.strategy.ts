import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JWT_REFRESH } from '../constants';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { JwtPayloadType } from '../types';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, JWT_REFRESH) {
  constructor(
    config: ConfigService,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_REFRESH_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayloadType) {
    const currentUser = await this.userService.userGetByEmail(payload.email);

    if (!currentUser || !currentUser.rtHash) throw new UnauthorizedException();

    const bearerRtToken = req.headers.authorization
      .replace('Bearer', '')
      .trim();

    delete currentUser.hash;
    delete currentUser.rtHash;

    console.log({ currentUser });

    const userDataWithBearerToken = { ...currentUser, bearerRtToken };

    return userDataWithBearerToken;
  }
}
