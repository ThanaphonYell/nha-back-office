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
@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(SystemUsers)
    private repoSystemUsers: Repository<SystemUsers>,
    @InjectRepository(SystemProfile)
    private repoSystemProfile: Repository<SystemProfile>, 
    private jwtService: JwtService,
  ) {}

  // verifyAuthentication(body: SignInAuthenticationDto) {
  //   return {
  //     ...body,
  //     hash: bcrypt.hashSync(body?.password, 12),
  //   };
  // }

  async registerAuthentication(body: RegisterAuthenticationDto) {
    const hashedPassword = await bcrypt.hash(body?.password, 12);
    const uuidAccount = uuidv4(); 

    const newUser = this.repoSystemUsers.create({
      ...body,
      uuid_account: uuidAccount, 
      last_login: new Date().toISOString(),
      password: hashedPassword,
    });

    const savedUser = await this.repoSystemUsers.save(newUser);

    const newProfile = this.repoSystemProfile.create({
      uuid_account: uuidAccount,
      display_name: body.name,
    });

    await this.repoSystemProfile.save(newProfile);

    return savedUser;
  }


  async verifyAuthentication(body: SignInAuthenticationDto): Promise<{ user: SystemUsers; accessToken: string }> {
    const user = await this.repoSystemUsers.findOne({
      where: { username: body.username },
      // relations: ['system_profile'],
    });

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid username or password');
    }

    user.last_login = new Date().toISOString();
    await this.repoSystemUsers.save(user);

    const payload = { sub: user.id, username: user.username, uuid: user.uuid_account };
    const accessToken = this.jwtService.sign(payload);
    
    return { user, accessToken };
  }

  getUrlOAuth() {
    try {
      return '';
    } catch (error) {
      throw new BadRequestException(`Error OAuth invalid URL authorize`);
    }
  }
}
