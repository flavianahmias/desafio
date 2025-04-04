import { Prisma } from '@prisma/client';
import { Task } from '../../domain/task';

export type Sort = 'asc' | 'desc';
export type OrderBy = 'id' | 'createdAt' | 'status';

export type FindAllTasksOptions = {
  page: number;
  pageSize: number;
  status?: number;
  orderBy: OrderBy;
  sort: Sort;
};

export type ListAllWhereClause = {
  AND: {
    status?: { equals: number };
  }[];
};

export interface ITaskRepo {
  save(data: Task): Promise<Task>;
  findOne(where: Prisma.TaskWhereInput): Promise<Task>;
  findAll(
    options: FindAllTasksOptions,
  ): Promise<{ total: number; data: Task[] }>;
  update(data: Task): Promise<Task>;
  delete(data: Task): Promise<void>;
}
