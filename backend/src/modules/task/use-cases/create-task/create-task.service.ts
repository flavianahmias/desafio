import { Inject, Injectable } from '@nestjs/common';
import { CreateTaskDTO } from '../../dtos/create-task.dto';
import { Task, TaskStatus } from '../../domain/task';
import { UseCase } from '../../../../shared/core/use-case';
import { ITaskRepo } from '../../repositories/interfaces/task-repo.interface';
import { IUserRepo } from '../../../user/repositories/interfaces/user-repo.interface';

type Input = CreateTaskDTO & { reqId: number };

type Result = Task;

@Injectable()
export class CreateTaskService implements UseCase<Input, Result> {
  constructor(
    @Inject('ITaskRepo') private readonly taskRepo: ITaskRepo,
    @Inject('IUserRepo') private readonly userRepo: IUserRepo,
  ) {}

  async execute(input: Input): Promise<Result> {
    const user = await this.userRepo.findOne({ id: input.reqId });

    const task = Task.create({
      description: input.description,
      title: input.title,
      status: TaskStatus.InProgress,
      user: user,
    });

    return await this.taskRepo.save(task);
  }
}
