import { TestingModule, Test } from '@nestjs/testing';
import { TaskRepoMock } from '../../repositories/mocks/task-repo-mock';
import { CreateTaskController } from './create-task.controller';
import { CreateTaskService } from './create-task.service';
import { tasksMocks } from '../../repositories/mocks/task-mocks';
import { UserRepoMock } from '../../../user/repositories/mocks/user-repo-mock';

describe('CreateTask', () => {
  let createTaskController: CreateTaskController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [CreateTaskController],
      providers: [
        CreateTaskService,
        TaskRepoMock,
        { provide: 'ITaskRepo', useExisting: TaskRepoMock },
        UserRepoMock,
        { provide: 'IUserRepo', useExisting: UserRepoMock },
      ],
    }).compile();

    createTaskController = app.get<CreateTaskController>(CreateTaskController);
  });

  it('should return a created mocked task', async () => {
    const result = await createTaskController.handle(
      {
        description: 'Descrição teste',
        title: 'Titulo teste',
      },
      1,
    );
    expect(result).toBeDefined();
    expect(result.title).toBe('Titulo teste');
  });
});
