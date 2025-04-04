import { Inject, Injectable } from '@nestjs/common';
import { ITaskRepo } from '../../repositories/interfaces/task-repo.interface';
import { Task } from '../../domain/task';
import { UseCase } from 'src/shared/core/use-case';
import { GetTaskDTO } from '../../dtos/get-tasks.dto';

type Input = GetTaskDTO;
type Result = {
  total: number;
  data: Task[];
};

@Injectable()
export class ListAllTasksService implements UseCase<Input, Result> {
  constructor(@Inject('ITaskRepo') private readonly taskRepo: ITaskRepo) {}

  async execute(input: Input): Promise<Result> {
    return await this.taskRepo.findAll({
      page: input.page,
      pageSize: input.pageSize,
      status: input.status,
      orderBy: 'id',
      sort: 'asc',
    });
  }
}
