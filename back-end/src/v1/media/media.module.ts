import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { MediaObject } from 'src/entities/media-object.entity';
import { MediaDirectory } from 'src/entities/media-directory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MediaObject, MediaDirectory])],
  providers: [MediaService],
  controllers: [MediaController],
})
export class MediaModule {}