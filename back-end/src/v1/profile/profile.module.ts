import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SystemProfile } from 'src/entities/system-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SystemProfile])],
  controllers: [ProfileController],
  providers: [ProfileService],
})
export class ProfileModule { }
