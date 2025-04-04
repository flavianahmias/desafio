import { Controller, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteTaskService } from './delete-task.service';

@ApiTags('Task')
@Controller('task')
export class DeleteTaskController {
    constructor(private deleteTaskService: DeleteTaskService) { }
    @Delete('/:id')
    async handle(@Param('id', ParseIntPipe) id: number) {
        return await this.deleteTaskService.execute({ id })
    }
}
