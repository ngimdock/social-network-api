import { Request } from 'express';
import { JwtPayloadType } from './payload.type';

export type UserRequest = Request & Record<'user', JwtPayloadType>;
