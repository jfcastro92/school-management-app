import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from 'src/entities/course/course.entity';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course) private courseRepository: Repository<Course>,
  ) {}
  async getCourses(): Promise<Course[]> {
    return await this.courseRepository.find();
  }

  findOne(id: number): Promise<Course> {
    return this.courseRepository.findOneBy({ id: id });
  }

  async createCourse(course: Course) {
    this.courseRepository.save(course);
  }

  async remove(id: string): Promise<void> {
    await this.courseRepository.delete(id);
  }

  async editCourse(id: number, course: Course): Promise<Course> {
    const editedCourse = await this.courseRepository.findOneBy({ id: id });
    if (!editedCourse) {
      throw new NotFoundException('Note is not found');
    }
    editedCourse.courseName = course.courseName;
    await editedCourse.save();
    return editedCourse;
  }
}
