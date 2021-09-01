import {
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm'

// see: https://typeorm.io/#/entities/column-types
@Entity()
export class Account {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  firstName: string

  @Column()
  lastName: string

  @Column()
  age: number

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
  })
  createdAt: string

  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'updated_at',
  })
  updatedAt: string

  @DeleteDateColumn({
    type: 'timestamptz',
    name: 'deleted_at',
  })
  deletedAt: string
}
