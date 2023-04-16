import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models';
import {
  CredentialsIncorrectException,
  UserNotFoudException,
} from './exceptions';
import { UserCreateOutput } from './dto';
import { UserCreateData } from './types';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async userCreate(input: UserCreateData): Promise<UserCreateOutput> {
    const foudUser = await this.userGetByEmail(input.email);

    if (foudUser) throw new CredentialsIncorrectException();

    const newUser = this.userRepository.create(input);

    await this.userRepository.save(newUser);

    return { user: newUser };
  }

  async userGetByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }

  async userGetById(userId: string): Promise<User> {
    const foundUser = await this.userRepository.findOne({
      where: { id: userId },
    });

    if (!foundUser) throw new UserNotFoudException();

    return foundUser;
  }

  async userUpdateRtHash(userId: string, newRtHash: string) {
    const user = await this.userGetById(userId);

    const rtHash = await argon2.hash(newRtHash);

    user.rtHash = rtHash;

    await user.save();
  }
}
