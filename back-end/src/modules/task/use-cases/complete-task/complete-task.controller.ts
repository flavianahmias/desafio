import { Controller, Param, ParseIntPipe, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompleteTaskService } from './complete-task.service';

@ApiTags('Task')
@Controller('task')
export class CompleteTaskController {
    constructor(private completeTaskService: CompleteTaskService) { }
    @Put('/:id/done')
    async handle(@Param('id', ParseIntPipe) id: number) {
        return await this.completeTaskService.execute({ id })
    }
}
