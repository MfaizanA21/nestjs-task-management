import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Task])], // Register Task entity
  controllers: [TasksController],
  providers: [TasksService, TasksRepository], // Register TasksRepository as a provider
})
export class TasksModule {}
