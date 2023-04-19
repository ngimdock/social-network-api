import { Args, ID, Query, Resolver } from '@nestjs/graphql';
import { User } from '../models';
import { UserService } from '../user.service';
import { CurrentUser } from 'src/auth/decorators';
import { UserCreateOutput } from '../dto';
import { JwtPayloadType } from 'src/auth/types';

@Resolver(User)
export class UserQueriesResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => UserCreateOutput)
  async findMe(
    @CurrentUser() currentUser: JwtPayloadType,
  ): Promise<UserCreateOutput> {
    const user = await this.userService.userGetById(currentUser.sub);

    return { user: user };
  }

  @Query(() => UserCreateOutput)
  async findOne(@Args({ name: 'userId', type: () => ID }) userId: string) {
    const user = await this.userService.userGetById(userId);

    return { user: user };
  }
}
