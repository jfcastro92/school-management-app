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
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Course } from 'src/entities/course/course.entity';
import { CourseService } from 'src/service/course/course.service';

@Controller('course')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Get()
  async findAll() {
    try {
      const results = await this.courseService.getCourses();
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
      const results = await this.courseService.findOne(id);
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

  @Post() async create(@Body() course: Course) {
    try {
      const results = await this.courseService.createCourse(course);
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
    @Body() course: Course,
    @Param('id') id: number,
  ): Promise<Course> {
    try {
      const courseEdited = await this.courseService.editCourse(id, course);
      return courseEdited;
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
      await this.courseService.remove(id);
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
