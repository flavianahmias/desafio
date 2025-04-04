import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { UpdateTaskDTO } from '../../dtos/update-task.dto';
import { TaskMapper } from '../../mappers/task-mapper';
import { UpdateTaskService } from './update-task.service';
import { JwtAuthGuard } from 'src/modules/user/use-cases/auth/jwt-auth.guard';

@ApiTags('Task')
@Controller('task')
export class UpdateTaskController {
  constructor(private updateTaskService: UpdateTaskService) {}
  @UseGuards(JwtAuthGuard)
  @Put('/:id')
  async handle(
    @Body() body: UpdateTaskDTO,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const result = await this.updateTaskService.execute({ ...body, id });
    return TaskMapper.toDTO(result);
  }
}
