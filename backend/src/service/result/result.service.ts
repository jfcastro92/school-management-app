import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StudentToCourse } from 'src/entities/studentCourse/studentToCourse.entity';
@Injectable()
export class ResultService {
  constructor(
    @InjectRepository(StudentToCourse)
    private resultRepository: Repository<StudentToCourse>,
    @InjectEntityManager() private resultSetRepository: Repository<any>,
  ) {}
  async getResults(): Promise<StudentToCourse[]> {
    return await this.resultRepository.find();
  }

  findOne(id: number): Promise<StudentToCourse> {
    return this.resultRepository.findOneBy({ studentToCourseId: id });
  }

  async createResult(result: StudentToCourse) {
    this.resultRepository.save(result);
  }

  async remove(id: string): Promise<void> {
    await this.resultRepository.delete(id);
  }

  async editResult(
    id: number,
    result: StudentToCourse,
  ): Promise<StudentToCourse> {
    const editedResult = await this.resultRepository.findOneBy({
      studentToCourseId: id,
    });
    if (!editedResult) {
      throw new NotFoundException('Note is not found');
    }
    editedResult.courseId = result.courseId;
    editedResult.studentId = result.studentId;
    await this.resultRepository.save(editedResult);
    return editedResult;
  }

  async getResultsByNames(): Promise<any> {
    const result = await this.resultSetRepository.query(
      'SELECT st.id, st.firstName, st.secondName, st.lastName, st.email, c.id, c.courseName, sc.studentToCourseId, sc.grade FROM localhost.student st JOIN localhost.student_to_course sc ON st.id = sc.studentId JOIN localhost.course c ON c.id = sc.courseId;',
    );
    return result;
  }
}
