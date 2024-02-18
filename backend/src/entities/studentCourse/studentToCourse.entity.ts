import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Student } from '../student/student.entity';
import { Course } from '../course/course.entity';

@Entity()
export class StudentToCourse {
  @PrimaryGeneratedColumn()
  public studentToCourseId: number;

  @Column()
  public studentId: number;

  @Column()
  public courseId: number;

  @Column()
  public grade: string;

  @ManyToOne(() => Student, (student: Student) => student.studentToCourses)
  public student: Student;

  @ManyToOne(() => Course, (course: Course) => course.courseToStudent)
  public course: Course;
}
