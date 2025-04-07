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
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(
    @Query() filterDto: GetTaskFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.tasksService.getTasks(filterDto, user);
  }

  @Post('create')
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    console.log(createTaskDto.title, createTaskDto.description);
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<string> {
    return this.tasksService.deleteTask(id, user);
  }

  @Patch('/update-task/:id/status')
  updateTaskById(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.updateTaskById(id, status, user);
  }

  @Get('/:id')
  getTaskById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Task> | [] {
    return this.tasksService.getTaskById(id, user);
  }
}
