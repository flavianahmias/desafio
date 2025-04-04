import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from 'src/shared/core/use-case';
import { ITaskRepo } from '../../repositories/interfaces/task-repo.interface';
import { Task } from '../../domain/task';

type Input = { id: number }

type Result = Task

@Injectable()
export class GetTaskByIdService implements UseCase<Input, Result> {
    constructor(@Inject('ITaskRepo') private readonly taskRepo: ITaskRepo,
    ) { }

    async execute(input: Input): Promise<Result> {
        const task = await this.taskRepo.findOne({ id: input.id })
        return task
    }


}

