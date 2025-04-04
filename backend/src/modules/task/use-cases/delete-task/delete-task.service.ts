import { Inject, Injectable } from '@nestjs/common';
import { UseCase } from 'src/shared/core/use-case';
import { Task, TaskStatus } from '../../domain/task';
import { ITaskRepo } from '../../repositories/interfaces/task-repo.interface';

type Input = { id: number }

type Result = {
    success: true
}

@Injectable()
export class DeleteTaskService implements UseCase<Input, Result> {
    constructor(@Inject('ITaskRepo') private readonly taskRepo: ITaskRepo,
    ) { }

    async execute(input: Input): Promise<Result> {

        const task = await this.taskRepo.findOne({ id: input.id })

        await this.taskRepo.delete(task)

        return { success: true }
    }


}
