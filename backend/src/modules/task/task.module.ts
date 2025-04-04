import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { TaskRepoService } from './repositories/prisma/task-repo';
import { UserRepoService } from '../user/repositories/prisma/user-repo';
import { CreateTaskService } from './use-cases/create-task/create-task.service';
import { CreateTaskController } from './use-cases/create-task/create-task.controller';
import { UpdateTaskController } from './use-cases/update-task/update-task.controller';
import { ListAllTasksController } from './use-cases/list-all-tasks/list-all-tasks.controller';
import { GetTaskByIdController } from './use-cases/get-task-by-id/get-task-by-id.controller';
import { DeleteTaskController } from './use-cases/delete-task/delete-task.controller';
import { DeleteTaskService } from './use-cases/delete-task/delete-task.service';
import { GetTaskByIdService } from './use-cases/get-task-by-id/get-task-by-id.service';
import { ListAllTasksService } from './use-cases/list-all-tasks/list-all-tasks.service';
import { UpdateTaskService } from './use-cases/update-task/update-task.service';
import { CompleteTaskController } from './use-cases/complete-task/complete-task.controller';
import { CompleteTaskService } from './use-cases/complete-task/complete-task.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    UserModule,
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '8h',
      },
    }),
  ],
  providers: [
    CreateTaskService,
    DeleteTaskService,
    UpdateTaskService,
    ListAllTasksService,
    GetTaskByIdService,
    UserRepoService,
    TaskRepoService,
    { provide: 'ITaskRepo', useExisting: TaskRepoService },
    { provide: 'IUserRepo', useExisting: UserRepoService },
    CompleteTaskService,
  ],
  controllers: [
    CreateTaskController,
    DeleteTaskController,
    UpdateTaskController,
    ListAllTasksController,
    GetTaskByIdController,
    CompleteTaskController,
  ],
})
export class TaskModule {}
