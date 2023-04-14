import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './models';
import { CredentialsIncorrectException } from './exceptions';
import { UserCreateInput, UserCreateOutput } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async userCreate(input: UserCreateInput): Promise<UserCreateOutput> {
    const foudUser = await this.userGetByEmail(input.email);

    if (foudUser) throw new CredentialsIncorrectException();

    const newUser = this.userRepository.create(input);

    await this.userRepository.save(newUser);

    return { user: newUser };
  }

  async userGetByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({ email });
  }
}
