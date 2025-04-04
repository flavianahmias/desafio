import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { TaskMapper } from '../../mappers/task-mapper';
import { CreateTaskDTO } from '../../dtos/create-task.dto';
import { CreateTaskService } from './create-task.service';

@ApiTags('Task')
@Controller('task')
export class CreateTaskController {
  constructor(private createTaskService: CreateTaskService) {}
  @Post()
  async handle(@Body() body: CreateTaskDTO, @Req() requester) {
    const result = await this.createTaskService.execute({
      ...body,
      reqId: requester,
    });
    return TaskMapper.toDTO(result);
  }
}
