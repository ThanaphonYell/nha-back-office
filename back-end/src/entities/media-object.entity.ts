import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { MediaDirectory } from './media-directory.entity';

@Entity({ name: 'media_object' })
export class MediaObject {
  @PrimaryGeneratedColumn({ name: 'obj_id' })
  objId: number;

  @Column({ name: 'md_id', nullable: true })
  mdId: number;

  @Column({ type: 'varchar', length: 100, name: 'obj_type' })
  objType: string;

  @Column({ type: 'varchar', length: 255, name: 'obj_name' })
  objName: string;

  @Column({ type: 'varchar', length: 255, name: 'obj_alt', nullable: true })
  objAlt?: string;

  @Column({ type: 'jsonb', name: 'obj_file' })
  objFile: { url: string; size: number; mimeType: string };

  @Column({ type: 'varchar', length: 100, name: 'obj_status' })
  objStatus: string;

  @Column({ type: 'boolean', default: true })
  active: boolean;

  @Column({ type: 'varchar', length: 255, name: 'created_by' })
  createdBy: string;

  @Column({ type: 'varchar', length: 255, name: 'updated_by', nullable: true })
  updatedBy?: string;

  @Column({ type: 'timestamp with time zone', name: 'created_datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdDatetime: Date;

  @Column({
    type: 'timestamp with time zone',
    name: 'updated_datetime',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedDatetime: Date;

  @ManyToOne(() => MediaDirectory, (directory) => directory.mediaObjects, { nullable: true })
  @JoinColumn({ name: 'md_id' })
  directory?: MediaDirectory;
}