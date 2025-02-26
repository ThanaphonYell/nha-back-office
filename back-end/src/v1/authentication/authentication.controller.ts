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
  constructor(private readonly authenticationService: AuthenticationService) { }

  @Post('sign-in')
  async signIn(@Body() body: SignInAuthenticationDto): Promise<{ id_token: string; session_expire: number; refresh_token: string; }> {
    return this.authenticationService.signIn(body);
  }

  @Post('sign-up')
  async register(@Body() body: RegisterAuthenticationDto) {
    await this.authenticationService.signUp(body);
    return null
  }

  @Get('url')
  findAll() {
    const url = this.authenticationService.getUrlOAuth();
    return {
      url,
    };
  }
}
