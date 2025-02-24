import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { SystemUsers } from "./system-users.entity";

@Entity()
export class SystemProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  display_name: string; 

  @Column({ type: 'json', nullable: true }) 
  profile_image: any;

  @Column({ type: 'varchar', length: 255, unique: true })
  uuid_account: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created_datetime: string;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updated_datetime: string;

  // @OneToOne(() => SystemUsers, (user) => user.profile)
  // @JoinColumn({ name: 'uuid_account' })
  // user: SystemUsers;
}