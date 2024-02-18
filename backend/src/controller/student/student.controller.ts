import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ParseIntPipe } from '@nestjs/common/pipes/parse-int.pipe';
import { Student } from 'src/entities/student/student.entity';
import { StudentService } from 'src/service/student/student.service';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Get()
  async findAll() {
    try {
      const results = await this.studentService.getStudents();
      return {
        statusCode: StatusCodes.OK,
        status: ReasonPhrases.OK,
        data: results,
      };
    } catch (error) {
      throw {
        status: ReasonPhrases.INTERNAL_SERVER_ERROR,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        data: new Error(error),
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id) {
    try {
      const results = await this.studentService.findOne(id);
      return {
        statusCode: StatusCodes.OK,
        status: ReasonPhrases.OK,
        data: results,
      };
    } catch (error) {
      throw {
        status: ReasonPhrases.INTERNAL_SERVER_ERROR,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        data: new Error(error),
      };
    }
  }

  @Post() async create(@Body() student: Student) {
    try {
      const results = await this.studentService.createStudent(student);
      return {
        statusCode: StatusCodes.CREATED,
        status: ReasonPhrases.CREATED,
        data: results,
      };
    } catch (error) {
      throw {
        status: ReasonPhrases.INTERNAL_SERVER_ERROR,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        data: new Error(error),
      };
    }
  }

  @Patch(':id')
  async editStudent(
    @Body() student: Student,
    @Param('id') id: number,
  ): Promise<Student> {
    try {
      const studentEdited = await this.studentService.editStudent(id, student);
      return studentEdited;
    } catch (error) {
      throw {
        status: ReasonPhrases.INTERNAL_SERVER_ERROR,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        data: new Error(error),
      };
    }
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id) {
    try {
      await this.studentService.remove(id);
      return {
        status: ReasonPhrases.ACCEPTED,
        statusCode: StatusCodes.ACCEPTED,
        data: [],
      };
    } catch (error) {
      throw {
        status: ReasonPhrases.INTERNAL_SERVER_ERROR,
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        data: new Error(error),
      };
    }
  }
}
