import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';
import { CreateTaskDto } from './dtos/create-task.dto';
import { TaskStatus } from './task-status.enum';
import { GetTaskFilterDto } from './dtos/get-tasks-filter.dto';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
  constructor(private tasksRepository: TasksRepository) {}

  getTasks(filterDto: GetTaskFilterDto | null, user: User): Promise<Task[]> {
    return this.tasksRepository.GetTasks(filterDto, user);
  }

  async getTaskById(id: string, user: User): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id, user } });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  async updateTaskById(
    id: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;

    await this.tasksRepository.save(task);

    return task;
  }

  async deleteTask(id: string, user: User): Promise<string> {
    const result = await this.tasksRepository.delete({ id, user });
    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return 'Task deleted successfully';
  }

  createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }
}
