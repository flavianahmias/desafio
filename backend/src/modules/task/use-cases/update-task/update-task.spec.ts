import { TestingModule, Test } from '@nestjs/testing';
import { TaskRepoMock } from '../../repositories/mocks/task-repo-mock';
import { tasksMocks } from '../../repositories/mocks/task-mocks';
import { UserRepoMock } from '../../../user/repositories/mocks/user-repo-mock';
import { UpdateTaskController } from './update-task.controller';
import { UpdateTaskService } from './update-task.service';

describe('UpdateTask', () => {
  let updateTaskController: UpdateTaskController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UpdateTaskController],
      providers: [
        UpdateTaskService,
        TaskRepoMock,
        { provide: 'ITaskRepo', useExisting: TaskRepoMock },
        UserRepoMock,
        { provide: 'IUserRepo', useExisting: UserRepoMock },
      ],
    }).compile();

    updateTaskController = app.get<UpdateTaskController>(UpdateTaskController);
  });

  it('should return a updated mocked task', async () => {
    const newDescription = 'Nova descrição';
    const newTitle = 'Novo título';

    const result = await updateTaskController.handle(
      {
        description: newDescription,
        title: newTitle,
        id: 1,
      },
      1,
    );
    expect(result).toBeDefined();
    expect(result.title).toEqual(newTitle);
    expect(result.description).toEqual(newDescription);
  });
});
