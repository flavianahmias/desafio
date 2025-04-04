import { Test, TestingModule } from '@nestjs/testing';
import { GetTaskByIdController } from './get-task-by-id.controller';
import { GetTaskByIdService } from './get-task-by-id.service';
import { TaskRepoMock } from '../../repositories/mocks/task-repo-mock';
import { tasksMocks } from '../../repositories/mocks/task-mocks';

describe('GetTaskById', () => {
  let getTaskByIdController: GetTaskByIdController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [GetTaskByIdController],
      providers: [
        GetTaskByIdService,
        TaskRepoMock,
        { provide: 'ITaskRepo', useExisting: TaskRepoMock },
      ],
    }).compile();

    getTaskByIdController = app.get<GetTaskByIdController>(
      GetTaskByIdController,
    );
  });

  it('should return a mocked task', async () => {
    const result = await getTaskByIdController.handle(1);
    expect(result).toBeDefined();
    expect(result.title).toBe(tasksMocks[0].title);
  });
});
