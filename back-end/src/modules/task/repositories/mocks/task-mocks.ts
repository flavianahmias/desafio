import { User } from '../../../user/domain/user';
import { Task } from '../../domain/task';

export const tasksMocks: Task[] = [
  Task.create({
    title: 'Lavar a louça',
    description: 'Tem que ser de manhã',
    status: 1,
    user: User.create({
      username: 'mocked user',
      password: '123',
    }),
  }),
  Task.create({
    title: 'Task 2',
    description: 'Description 2',
    status: 1,
    user: User.create({
      username: 'mocked user',
      password: '123',
    }),
  }),
  Task.create({
    title: 'Task 3',
    description: 'Description 3',
    status: 1,
    user: User.create({
      username: 'mocked user',
      password: '123',
    }),
  }),
  Task.create({
    title: 'Task 4',
    description: 'Description 4',
    status: 1,
    user: User.create({
      username: 'mocked user',
      password: '123',
    }),
  }),
  Task.create({
    title: 'Task 5',
    description: 'Description 5',
    status: 1,
    user: User.create({
      username: 'mocked user',
      password: '123',
    }),
  }),
];

export const taskMock = Task.create({
  title: 'Lavar a louça',
  description: 'Tem que ser de manhã',
  status: 1,
  user: User.create({
    username: 'mocked user',
    password: '123',
  }),
});
