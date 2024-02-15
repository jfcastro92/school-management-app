import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from 'src/entities/student/student.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}
  async getStudents(): Promise<Student[]> {
    return await this.studentRepository.find();
  }

  findOne(id: number): Promise<Student> {
    return this.studentRepository.findOneBy({ id: id });
  }

  async createStudent(student: Student) {
    this.studentRepository.save(student);
  }

  async remove(id: string): Promise<void> {
    await this.studentRepository.delete(id);
  }

  async editStudent(id: number, student: Student): Promise<Student> {
    const editedStudent = await this.studentRepository.findOneBy({ id: id });
    if (!editedStudent) {
      throw new NotFoundException('Note is not found');
    }
    editedStudent.firstName = student.firstName;
    editedStudent.lastName = student.lastName;
    editedStudent.birthdate = student.birthdate;
    await editedStudent.save();
    return editedStudent;
  }
}
