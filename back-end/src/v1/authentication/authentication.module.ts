import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemUsers } from 'src/entities/system-users.entity';
import { SystemProfile } from 'src/entities/system-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SystemUsers, SystemProfile])],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
