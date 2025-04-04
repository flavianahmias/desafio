import {
  Controller,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompleteTaskService } from './complete-task.service';
import { JwtAuthGuard } from 'src/modules/user/use-cases/auth/jwt-auth.guard';

@ApiTags('Task')
@Controller('task')
export class CompleteTaskController {
  constructor(private completeTaskService: CompleteTaskService) {}
  @UseGuards(JwtAuthGuard)
  @Put('/:id/done')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.completeTaskService.execute({ id });
  }
}
