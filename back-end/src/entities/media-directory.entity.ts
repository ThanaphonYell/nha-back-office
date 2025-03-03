import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MediaObject } from './media-object.entity';

@Entity({ name: 'media_directory' })
export class MediaDirectory {
  @PrimaryGeneratedColumn({ name: 'md_id' })
  mdId: number;

  @Column({ name: 'md_parent_id', nullable: true })
  mdParentId?: number;

  @Column({ type: 'varchar', length: 150, name: 'md_parent_slug', nullable: true })
  mdParentSlug?: string;

  @Column({ type: 'varchar', length: 255, name: 'md_name' })
  mdName: string;

  @Column({ type: 'varchar', length: 100, name: 'md_status' })
  mdStatus: string;

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

  @OneToMany(() => MediaObject, (mediaObject) => mediaObject.directory)
  mediaObjects?: MediaObject[];
}