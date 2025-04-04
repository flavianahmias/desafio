import {
  Controller,
  Delete,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DeleteTaskService } from './delete-task.service';
import { JwtAuthGuard } from 'src/modules/user/use-cases/auth/jwt-auth.guard';

@ApiTags('Task')
@Controller('task')
export class DeleteTaskController {
  constructor(private deleteTaskService: DeleteTaskService) {}
  @UseGuards(JwtAuthGuard)
  @Delete('/:id')
  async handle(@Param('id', ParseIntPipe) id: number) {
    return await this.deleteTaskService.execute({ id });
  }
}
