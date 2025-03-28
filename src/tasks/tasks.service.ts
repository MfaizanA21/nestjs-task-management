import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dtos/create-task.dto';
import { GetTaskFilterDto } from './dtos/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task | [] {
    const task = this.tasks.find((task) => task.id === id);
    if(task !== undefined) {
      return task;
    } else {
      return [];
    }
  }

  updateTaskById(id: string, status: TaskStatus): Task | [] {
    const task = this.tasks.find((task) => task.id === id);
    if(task !== undefined) {
      task.status = status;
      return task;
    } else {
      return [];
    }
  }

  getTaskswithFilter(filerDto: GetTaskFilterDto): Task[] {
    const { status, search } = filerDto;
    let tasks = this.getAllTasks();

    if(status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if(search) {
      tasks = this.tasks.filter((task) => {
        if(task.title.includes(search) || task.description.includes(search)) {
          return true;
        } else {
          return false;
        }
      });
    }

    return tasks;
  }

  deleteTask(id: string): string{
    let message: string;
    const task = this.tasks.find((task) => task.id === id);
    if(task !== undefined) {
      this.tasks.splice(this.tasks.indexOf(task), 1);
      message = `Task with id ${id} deleted`;
    } else {
      message = `Task with id ${id} not found`;
    }
    return message;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    }

    this.tasks.push(task);

    return task;
  }
  
}
