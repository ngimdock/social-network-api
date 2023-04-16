import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthService } from '../auth.service';
import { AuthLoginInput, AuthRegisterInput } from '../dto';
import { AuthOutput } from 'src/common/dto';
import { Public } from '../decorators';

@Public()
@Resolver()
export class AuthMutationResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthOutput)
  localRegister(
    @Args('input') registerInput: AuthRegisterInput,
  ): Promise<AuthOutput> {
    return this.authService.localRegister(registerInput);
  }

  @Mutation(() => AuthOutput)
  localLogin(@Args('input') loginInput: AuthLoginInput): Promise<AuthOutput> {
    return this.authService.localLogin(loginInput);
  }
}
