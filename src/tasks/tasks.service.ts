import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>, // Use Repository<Task> directly
  ) {}

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  // getTaskById(id: string): Task | [] {
  //   const found = this.tasks.find((task) => task.id === id);
  //   if (!found) {
  //     throw new NotFoundException(`Task with Id "${id}" not found`);
  //   }
  //   return found;
  // }

  // updateTaskById(id: string, status: TaskStatus): Task | [] {
  //   const task = this.tasks.find((task) => task.id === id);
  //   if (task !== undefined) {
  //     task.status = status;
  //     return task;
  //   } else {
  //     return [];
  //   }
  // }

  // getTaskswithFilter(filerDto: GetTaskFilterDto): Task[] {
  //   const { status, search } = filerDto;
  //   let tasks = this.getAllTasks();

  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }

  //   if (search) {
  //     tasks = this.tasks.filter((task) => {
  //       if (task.title.includes(search) || task.description.includes(search)) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     });
  //   }

  //   return tasks;
  // }

  // deleteTask(id: string): string {
  //   let message: string;
  //   const task = this.tasks.find((task) => task.id === id);
  //   if (task !== undefined) {
  //     this.tasks.splice(this.tasks.indexOf(task), 1);
  //     message = `Task with id ${id} deleted`;
  //   } else {
  //     message = `Task with id ${id} not found`;
  //   }
  //   return message;
  // }

  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };

  //   this.tasks.push(task);

  //   return task;
  // }
}
