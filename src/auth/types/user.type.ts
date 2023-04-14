import { User } from 'src/user/models';

export interface UserBearer extends User {
  bearerRtToken: string;
}
