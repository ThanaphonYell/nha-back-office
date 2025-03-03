import { Controller, Post, UploadedFile, UseInterceptors, Body, BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaService } from './media.service';

@Controller('media')
export class MediaController {
  constructor(private readonly mediaService: MediaService) {}

  @Post('folder')
  async createFolder(
    @Body('name') name: string,
    @Body('parentId') parentId?: string,
  ) {
    if (!name) throw new BadRequestException('Folder name is required');
    const folder = await this.mediaService.createFolder(name, parentId ? parseInt(parentId) : undefined);
    return {
      message: 'Folder created successfully',
      data: folder,
    };
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/image\/(jpg|jpeg|png|gif)/)) {
          return cb(new Error('Only image files are allowed'), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body('mdId') mdId?: string,
  ) {
    if (!file) throw new BadRequestException('Please upload a file');
    const media = await this.mediaService.uploadFile(file, mdId ? parseInt(mdId) : undefined);
    return {
      message: 'Upload successful',
      data: {
        id: media.objId,
        name: media.objName,
        url: media.objFile.url,
        mimeType: media.objFile.mimeType,
        size: media.objFile.size,
        folderId: media.mdId,
        createdAt: media.createdDatetime,
      },
    };
  }
}