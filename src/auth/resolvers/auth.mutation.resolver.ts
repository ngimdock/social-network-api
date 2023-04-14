import { Args, Context, Resolver } from '@nestjs/graphql';
import { AuthService } from '../auth.service';

@Resolver()
export class AuthMutationResolver {
  constructor(private readonly authService: AuthService) {}

  async login(
    @Context('req') req,
    @Args('email') _email: string,
    @Args('password') _password: string,
  ) {
    return this.authService.login(req.user);
  }
}
