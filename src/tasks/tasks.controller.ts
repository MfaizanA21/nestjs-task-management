import {
  Body,
  // Body,
  Controller,
  Delete,
  // Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  // Patch,
  // Post,
  // Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
// import { TaskStatus } from './task-status.enum';
// import { CreateTaskDto } from './dtos/create-task.dto';
// import { GetTaskFilterDto } from './dtos/get-tasks-filter.dto';
import { Task } from './task.entity';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dtos/get-tasks-filter.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTaskFilterDto): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto);
  }

  @Post('create')
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    console.log(createTaskDto.title, createTaskDto.description);
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): Promise<string> {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/update-task/:id/status')
  updateTaskById(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Promise<Task> {
    return this.tasksService.updateTaskById(id, status);
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> | [] {
    return this.tasksService.getTaskById(id);
  }
}
