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
import { StudentToCourse } from 'src/entities/studentCourse/studentToCourse.entity';
import { ResultService } from 'src/service/result/result.service';

@Controller('result')
export class ResultController {
  constructor(private resultService: ResultService) {}

  @Get()
  async findAll() {
    try {
      const results = await this.resultService.getResults();
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

  @Get('/getresultlist')
  async findAllResults() {
    try {
      const results = await this.resultService.getResultsByNames();
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
      const results = await this.resultService.findOne(id);
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

  @Post() async create(@Body() result: StudentToCourse) {
    try {
      const results = await this.resultService.createResult(result);
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
  async editResult(
    @Body() result: StudentToCourse,
    @Param('id') id: number,
  ): Promise<StudentToCourse> {
    try {
      const resultEdited = await this.resultService.editResult(id, result);
      return resultEdited;
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
      await this.resultService.remove(id);
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
