import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SystemUsers } from '../../entities/system-users.entity';
import { Repository } from 'typeorm';
import { SignInAuthenticationDto } from './dto/signin-authentication.dto';
import * as bcrypt from 'bcrypt';
import { RegisterAuthenticationDto } from './dto/register-authentication.dto';
import { SystemProfile } from 'src/entities/system-profile.entity';
import { v4 as uuidv4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
interface ISignInResponse {
  id_token: string;
  session_expire: number;
  refresh_token: string;
}
@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(SystemUsers)
    private repoSystemUsers: Repository<SystemUsers>,
    @InjectRepository(SystemProfile)
    private repoSystemProfile: Repository<SystemProfile>,
    private jwtService: JwtService,
  ) { }


  async signUp(body: RegisterAuthenticationDto): Promise<SystemUsers> {
    const existingUser = await this.repoSystemUsers.findOne({
      where: { username: body.username },
    });
    if (existingUser) {
      throw new BadRequestException('Username already exists');
    }

    const uuidAccount = uuidv4();
    const hashedPassword = await bcrypt.hash(body.password, 12);

    return this.repoSystemUsers.manager.transaction(async (manager) => {
      const newUser = manager.create(SystemUsers, {
        username: body.username,
        password: hashedPassword,
        uuid_account: uuidAccount,
        last_login: new Date().toISOString(),
      });
      const savedUser = await manager.save(newUser);

      const newProfile = manager.create(SystemProfile, {
        uuid_account: uuidAccount,
        display_name: body.name,
      });
      await manager.save(newProfile);

      // savedUser.profile = newProfile;
      return savedUser;
    });
  }

  // async signIn(body: SignInAuthenticationDto): Promise<ISignInResponse> {
  //   const user = await this.repoSystemUsers.findOne({
  //     where: { username: body.username }
  //   });

  //   if (!user) {
  //     throw new UnauthorizedException('Invalid username or password');
  //   }

  //   const isPasswordValid = await bcrypt.compare(body.password, user.password);
  //   if (!isPasswordValid) {
  //     throw new UnauthorizedException('Invalid username or password');
  //   }

  //   user.last_login = new Date().toISOString();
  //   await this.repoSystemUsers.save(user);

  //   const payload = { sub: user.id, username: user.username, uuid: user.uuid_account };
  //   const accessToken = this.jwtService.sign(payload);

  //   const refreshPayload = { sub: user.id, username: user.username, uuid: user.uuid_account, type: 'refresh' };
  //   const refreshToken = this.jwtService.sign(refreshPayload, { expiresIn: '7d' });

  //   const decodedAccessToken = this.jwtService.decode(accessToken) as { exp: number };

  //   return {
  //     idToken :accessToken,
  //     session_expire: decodedAccessToken.exp, 
  //     refresh_token: refreshToken,
  //   };
  // }


  async signIn(body: SignInAuthenticationDto): Promise<ISignInResponse> {
    const user = await this.findUserByUsername(body.username);

    await this.validateCredentials(user, body.password);
    await this.updateLastLogin(user);

    return this.generateTokens(user);
  }

  private async findUserByUsername(username: string): Promise<SystemUsers> {
    const user = await this.repoSystemUsers.findOne({ where: { username } });
    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }
    return user;
  }

  private async validateCredentials(user: SystemUsers, password: string): Promise<void> {
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }
  }

  private async updateLastLogin(user: SystemUsers): Promise<void> {
    user.last_login = new Date().toISOString();
    await this.repoSystemUsers.save(user);
  }

  private generateTokens(user: SystemUsers): ISignInResponse {
    try {
      const accessPayload = { sub: user.id, username: user.username, uuid: user.uuid_account };
      const idToken = this.jwtService.sign(accessPayload);

      const refreshPayload = { ...accessPayload, type: 'refresh' };
      const refreshToken = this.jwtService.sign(refreshPayload, { expiresIn: '7d' });

      const decodedToken = this.jwtService.decode(idToken) as { exp: number };

      return {
        id_token: idToken,
        session_expire: decodedToken.exp,
        refresh_token: refreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException('Failed to generate tokens');
    }
  }

  getUrlOAuth() {
    try {
      return '';
    } catch (error) {
      throw new BadRequestException(`Error OAuth invalid URL authorize`);
    }
  }
}
