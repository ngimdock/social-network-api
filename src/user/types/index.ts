import { UserCreateInput } from '../dto';

export type UserCreateData = Omit<UserCreateInput, 'password'> &
  Record<'hash', string>;
