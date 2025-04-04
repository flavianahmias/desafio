import { Inject, Injectable } from '@nestjs/common';
import { Task } from '../../domain/task';
import { UseCase } from 'src/shared/core/use-case';
import { ITaskRepo } from '../../repositories/interfaces/task-repo.interface';
import { UpdateTaskDTO } from '../../dtos/update-task.dto';

type Input = UpdateTaskDTO;

type Result = Task;

@Injectable()
export class UpdateTaskService implements UseCase<Input, Result> {
  constructor(@Inject('ITaskRepo') private readonly taskRepo: ITaskRepo) {}

  async execute(input: Input): Promise<Result> {
    const task = await this.taskRepo.findOne({ id: input.id });

    task.description = input.description ?? task.description;
    task.title = input.title ?? task.title;

    return await this.taskRepo.update(task);
  }
}
