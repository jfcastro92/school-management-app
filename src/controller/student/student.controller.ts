import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';
import { Student } from 'src/entities/student/student.entity';
import { StudentService } from 'src/service/student/student.service';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get()
  findAll() {
    return this.studentService.getStudents();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id) {
    return this.studentService.findOne(id);
  }

  @Post() create(@Body() student: Student) {
    return this.studentService.createStudent(student);
  }

  @Patch(':id')
  async editStudent(
    @Body() student: Student,
    @Param('id') id: number,
  ): Promise<Student> {
    const studentEdited = await this.studentService.editStudent(id, student);
    return studentEdited;
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id) {
    this.studentService.remove(id);
  }
}
