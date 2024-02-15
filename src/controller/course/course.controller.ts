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
import { Course } from 'src/entities/course/course.entity';
import { CourseService } from 'src/service/course/course.service';

@Controller('student')
export class CourseController {
  constructor(private courseService: CourseService) {}

  @Get()
  findAll() {
    return this.courseService.getCourses();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id) {
    return this.courseService.findOne(id);
  }

  @Post() create(@Body() course: Course) {
    return this.courseService.createCourse(course);
  }

  @Patch(':id')
  async editStudent(
    @Body() course: Course,
    @Param('id') id: number,
  ): Promise<Course> {
    const courseEdited = await this.courseService.editCourse(id, course);
    return courseEdited;
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id) {
    this.courseService.remove(id);
  }
}
