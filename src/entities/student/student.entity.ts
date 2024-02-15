import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsDateString, IsString, MaxLength, MinLength } from 'class-validator';
import { StudentToCourse } from '../studentCourse/studentToCourse.entity';

@Entity()
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  firstName: string;

  @Column({ length: 150 })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  lastName: string;

  @Column({ length: 150 })
  @MaxLength(150)
  @IsString()
  email: string;

  @IsDateString()
  @Column('date')
  birthdate: Date;

  @OneToMany(() => StudentToCourse, (StudentToCourse) => StudentToCourse.course)
  public studentToCourses: StudentToCourse[];
}
