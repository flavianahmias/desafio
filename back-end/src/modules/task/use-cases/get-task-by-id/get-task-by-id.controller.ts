import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { TaskMapper } from '../../mappers/task-mapper';
import { ApiTags } from '@nestjs/swagger';
import { GetTaskByIdService } from './get-task-by-id.service';

@ApiTags('Task')
@Controller('task')
export class GetTaskByIdController {
    constructor(private getTaskByIdService: GetTaskByIdService) { }
    @Get('/:id')
    async handle(@Param('id', ParseIntPipe) id: number) {
        const result = await this.getTaskByIdService.execute({ id })
        return TaskMapper.toDTO(result)
    }
}
