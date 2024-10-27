import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("users")
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  user_id: string

  @Column({ type: "varchar", length: 255, nullable: false })
  first_name: string

  @Column({ type: "varchar", length: 255, nullable: false, default: "" })
  last_name: string

  @Column({ type: "varchar", length: 255, nullable: false, unique: true })
  email: string

  @Column({ type: "varchar", length: 255, nullable: false })
  password: string

  @CreateDateColumn()
  created_at: Date | string

  @UpdateDateColumn()
  updated_at: Date | string
}