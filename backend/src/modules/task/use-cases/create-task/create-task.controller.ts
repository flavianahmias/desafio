import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TaskMapper } from '../../mappers/task-mapper';
import { CreateTaskDTO } from '../../dtos/create-task.dto';
import { CreateTaskService } from './create-task.service';
import { JwtAuthGuard } from '../../../user/use-cases/auth/jwt-auth.guard';

@ApiTags('Task')
@Controller('task')
export class CreateTaskController {
  constructor(private createTaskService: CreateTaskService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async handle(@Body() body: CreateTaskDTO, @Req() requester) {
    const result = await this.createTaskService.execute({
      ...body,
      reqId: requester.user.id,
    });
    return TaskMapper.toDTO(result);
  }
}
