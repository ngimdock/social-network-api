import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { User } from '../models';
import { UserService } from '../user.service';
import { UserCreateInput, UserCreateOutput } from '../dto';

@Resolver(User)
export class UserMutationResolver {
  constructor(private readonly userService: UserService) {}

  // @Mutation(() => UserCreateOutput)
  // async userCreate(
  //   @Args('input') input: UserCreateInput,
  // ): Promise<UserCreateOutput> {
  //   return this.userService.userCreate(input);
  // }
}
