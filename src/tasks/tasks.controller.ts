import {
  // Body,
  Controller,
  // Delete,
  Get,
  Param,
  // Patch,
  // Post,
  // Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
// import { TaskStatus } from './task-status.enum';
// import { CreateTaskDto } from './dtos/create-task.dto';
// import { GetTaskFilterDto } from './dtos/get-tasks-filter.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // getTasks(@Query() filerDto: GetTaskFilterDto): Task[] {
  //   if (Object.keys(filerDto).length) {
  //     return this.tasksService.getTaskswithFilter(filerDto);
  //   } else {
  //     return this.tasksService.getAllTasks();
  //   }
  // }

  // @Post('create')
  // createTask(@Body() createTaskDto: CreateTaskDto): Task {
  //   console.log(createTaskDto.title, createTaskDto.description);
  //   return this.tasksService.createTask(createTaskDto);
  // }

  // @Delete('/:id')
  // deleteTask(@Param('id') id: string): string {
  //   return this.tasksService.deleteTask(id);
  // }

  // @Patch('/update-task/:id/:status')
  // updateTaskById(
  //   @Param('id') id: string,
  //   @Param('status') status: TaskStatus,
  // ): Task | [] {
  //   return this.tasksService.updateTaskById(id, status);
  // }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> | [] {
    return this.tasksService.getTaskById(id);
  }
}
