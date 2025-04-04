import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ListAllTasksService } from './list-all-tasks.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetTaskDTO } from '../../dtos/get-tasks.dto';
import { TaskMapper } from '../../mappers/task-mapper';
import { JwtAuthGuard } from '../../../user/use-cases/auth/jwt-auth.guard';

@ApiTags('Task')
@Controller('task')
export class ListAllTasksController {
  constructor(private listAllTasksService: ListAllTasksService) {}

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  async handle(@Query() query: GetTaskDTO, @Req() requester) {
    const result = await this.listAllTasksService.execute({
      ...query,
      reqId: requester.user.id,
    });

    return { ...result, data: result.data.map(TaskMapper.toDTO) };
  }
}
