import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { TaskMapper } from '../../mappers/task-mapper';
import { Task } from '../../domain/task';
import {
  FindAllTasksOptions,
  ITaskRepo,
  ListAllWhereClause,
} from '../interfaces/task-repo.interface';
import { equal } from 'assert';

@Injectable()
export class TaskRepoService implements ITaskRepo {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(where: Prisma.TaskWhereInput): Promise<Task> {
    const result = await this.prisma.task.findFirst({
      where: where,
      include: { user: true },
    });

    if (!result) {
      throw new Error();
    }

    return TaskMapper.toDomain(result);
  }

  async save(data: Task): Promise<Task> {
    const result = await this.prisma.task.create({
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
        userId: data.user.id as number,
      },
      include: {
        user: true,
      },
    });

    return result && TaskMapper.toDomain(result);
  }

  async findAll(
    options: FindAllTasksOptions,
  ): Promise<{ total: number; data: Task[] }> {
    const whereClause: ListAllWhereClause = { AND: [] };

    const orderByClause = {
      id: { id: options.sort },
      createdAt: { createdAt: options.sort },
      status: { status: options.sort },
    };

    if (!!options.status) {
      whereClause.AND.push({ status: { equals: options.status } });
    }

    if (!!options.userId) {
      whereClause.AND.push({ userId: options.userId });
    }

    const skip = options.pageSize * (options.page - 1);
    const take = options.pageSize;

    const totalCount = await this.prisma.task.count({ where: whereClause });
    const data = await this.prisma.task.findMany({
      skip,
      take,
      where: whereClause,
      orderBy: orderByClause[options.orderBy],
    });

    return { total: totalCount, data: data.map(TaskMapper.toDomain) };
  }

  async update(data: Task): Promise<Task> {
    const result = await this.prisma.task.update({
      where: { id: data.id },
      data: {
        title: data.title,
        description: data.description,
        status: data.status,
      },
      include: {
        user: true,
      },
    });

    return result && TaskMapper.toDomain(result);
  }

  async delete(data: Task): Promise<void> {
    await this.prisma.task.delete({
      where: { id: data.id },
    });
  }
}
