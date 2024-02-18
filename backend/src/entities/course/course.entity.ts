import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsString, MaxLength, MinLength } from 'class-validator';
import { StudentToCourse } from '../studentCourse/studentToCourse.entity';

@Entity()
export class Course extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 150 })
  @MinLength(1)
  @MaxLength(150)
  @IsString()
  courseName: string;

  @OneToMany(
    () => StudentToCourse,
    (courseToStudent) => courseToStudent.student,
  )
  public courseToStudent: StudentToCourse[];
}
