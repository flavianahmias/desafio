import { Body, Controller, Param, ParseIntPipe, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateTaskDTO } from '../../dtos/update-task.dto';
import { TaskMapper } from '../../mappers/task-mapper';
import { UpdateTaskService } from './update-task.service';

@ApiTags('Task')
@Controller('task')
export class UpdateTaskController {
    constructor(private updateTaskService: UpdateTaskService) { }
    @Put('/:id')
    async handle(@Body() body: UpdateTaskDTO, @Param('id', ParseIntPipe) id: number) {
        const result = await this.updateTaskService.execute({ ...body, id })
        return TaskMapper.toDTO(result)
    }
}
