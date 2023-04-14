import { Injectable } from '@nestjs/common';
import { User } from 'src/user/models';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.userGetByEmail(email);

    if (!user || user.password !== password) return null;

    const { password: userPass, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }

  async login(user: User) {
    return 'User login...';
  }
}
