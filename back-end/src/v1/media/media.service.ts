import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { S3Client, PutObjectCommand, ObjectCannedACL } from '@aws-sdk/client-s3';
import { ConfigService } from '@nestjs/config';
import { MediaObject } from 'src/entities/media-object.entity';
import { MediaDirectory } from 'src/entities/media-directory.entity';

@Injectable()
export class MediaService {
  private s3Client: S3Client;

  constructor(
    private configService: ConfigService,
    @InjectRepository(MediaObject)
    private mediaRepository: Repository<MediaObject>,
    @InjectRepository(MediaDirectory)
    private directoryRepository: Repository<MediaDirectory>,
  ) {
    this.s3Client = new S3Client({
      region: this.configService.get<string>('AWS_REGION'),
      credentials: {
        accessKeyId: this.configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: this.configService.get<string>('AWS_SECRET_ACCESS_KEY'),
      },
    });
  }

  async createFolder(name: string, parentId?: number, userId?: string): Promise<MediaDirectory> {
    const exists = await this.directoryRepository.findOne({ where: { mdName: name } });
    if (exists) throw new Error('Folder name already exists');

    const folder = this.directoryRepository.create({
      mdName: name,
      mdParentId: parentId || null,
      mdStatus: 'active',
      createdBy: userId || 'system',
    });
    return this.directoryRepository.save(folder);
  }

  async uploadFile(file: Express.Multer.File, mdId?: number, userId?: string): Promise<MediaObject> {
    const fileName = `${Date.now()}-${file.originalname}`;
    const params = {
      Bucket: this.configService.get<string>('AWS_S3_BUCKET'),
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read' as ObjectCannedACL, // ระบุ type ชัดเจน
    };

    const command = new PutObjectCommand(params);
    await this.s3Client.send(command);

    const url = `https://${params.Bucket}.s3.${this.configService.get<string>('AWS_REGION')}.amazonaws.com/${fileName}`;

    const media = this.mediaRepository.create({
      mdId: mdId || null,
      objType: 'image',
      objName: file.originalname,
      objFile: { url, size: file.size, mimeType: file.mimetype },
      objStatus: 'active',
      createdBy: userId || 'system',
    });

    return this.mediaRepository.save(media);
  }
}