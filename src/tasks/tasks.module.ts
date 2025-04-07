import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Task]), AuthModule], // Register Task entity
  controllers: [TasksController],
  providers: [TasksService, TasksRepository], // Register TasksRepository as a provider
})
export class TasksModule {}
