import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultService } from 'src/service/result/result.service';
import { ResultController } from 'src/controller/result/result.controller';

import { StudentToCourse } from 'src/entities/studentCourse/studentToCourse.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentToCourse])],
  providers: [ResultService],
  controllers: [ResultController],
})
export class ResultModule {}
