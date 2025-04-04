import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from 'src/shared/core/use-case';
import { ITaskRepo } from '../../repositories/interfaces/task-repo.interface';
import { TaskStatus } from '../../domain/task';

type Input = { id: number }

type Result = {
    success: true
}

@Injectable()
export class CompleteTaskService implements UseCase<Input, Result> {
    constructor(@Inject('ITaskRepo') private readonly taskRepo: ITaskRepo,
    ) { }

    async execute(input: Input): Promise<Result> {
        const task = await this.taskRepo.findOne({ id: input.id })
        task.status = TaskStatus.Done;
        await this.taskRepo.update(task)
        return {
            success: true
        }
    }
}
