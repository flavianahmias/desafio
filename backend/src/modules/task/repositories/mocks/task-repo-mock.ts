import { Prisma } from '@prisma/client';
import { Task } from '../../domain/task';
import {
  FindAllTasksOptions,
  ITaskRepo,
} from '../interfaces/task-repo.interface';
import { User } from '../../../user/domain/user';
import { tasksMocks } from './task-mocks';
import { userMock } from '../../../user/repositories/mocks/user-mock';

export class TaskRepoMock implements ITaskRepo {
  async save(data: Task): Promise<Task> {
    return Promise.resolve(
      Task.create({
        title: data.title,
        description: data.description,
        status: 1,
        user: userMock,
      }),
    );
  }
  async findOne(where: Prisma.TaskWhereInput): Promise<Task> {
    return Promise.resolve(tasksMocks[0]);
  }

  async findAll(
    options: FindAllTasksOptions,
  ): Promise<{ total: number; data: Task[] }> {
    return Promise.resolve({ total: tasksMocks.length, data: tasksMocks });
  }
  async update(data: Task): Promise<Task> {
    return data;
  }

  async delete(data: Task): Promise<void> {}
}
