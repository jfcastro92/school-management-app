import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { AppController } from './controller/app.controller';
import { AppService } from './service/app.service';
import { StudentModule } from './modules/student.module';
import { CourseModule } from './modules/course.module';
import { ResultModule } from './modules/result.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'localhost',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    StudentModule,
    CourseModule,
    ResultModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
