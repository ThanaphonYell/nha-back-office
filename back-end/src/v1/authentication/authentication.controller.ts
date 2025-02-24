import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { EV1Constant } from '../v1.constant';
import { SignInAuthenticationDto } from './dto/signin-authentication.dto';
import { RegisterAuthenticationDto } from './dto/register-authentication.dto';

@Controller({
  version: EV1Constant.version,
  path: 'authentication',
})
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('sign-in')
  async signIn(@Body() body: SignInAuthenticationDto) {
    const { user, accessToken } = await this.authenticationService.verifyAuthentication(body);
    return {
      status: 'success',
      message: 'Signed in successfully',
      data: {
        user: {
          id: user.id,
          username: user.username,
          uuid_account: user.uuid_account,
          last_login: user.last_login,
        },
        access_token: accessToken,
      },
    };
  }
  @Post('register')
  async register(@Body() body: RegisterAuthenticationDto) {
    const user = await this.authenticationService.registerAuthentication(body);
    return {
      status: 'success',
      message: 'User registered successfully',
      // data: user
    };
  }

  @Get('url')
  findAll() {
    const url = this.authenticationService.getUrlOAuth();
    return {
      url,
    };
  }
}
