import { TestingModule, Test } from '@nestjs/testing';
import { TaskRepoMock } from '../../repositories/mocks/task-repo-mock';
import { tasksMocks } from '../../repositories/mocks/task-mocks';
import { UserRepoMock } from '../../../user/repositories/mocks/user-repo-mock';
import { ListAllTasksController } from './list-all-tasks.controller';
import { ListAllTasksService } from './list-all-tasks.service';

describe('ListAllTasks', () => {
  let listAllTasksController: ListAllTasksController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ListAllTasksController],
      providers: [
        ListAllTasksService,
        TaskRepoMock,
        { provide: 'ITaskRepo', useExisting: TaskRepoMock },
        UserRepoMock,
        { provide: 'IUserRepo', useExisting: UserRepoMock },
      ],
    }).compile();

    listAllTasksController = app.get<ListAllTasksController>(
      ListAllTasksController,
    );
  });

  it('should return a task list', async () => {
    const result = await listAllTasksController.handle({
      page: 1,
      pageSize: 5,
    });

    expect(result).toBeDefined();
    expect(result.total).toEqual(5);
  });
});
