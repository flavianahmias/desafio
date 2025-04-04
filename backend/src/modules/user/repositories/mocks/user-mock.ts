import { User } from '../../domain/user';

export const usersMock = [
  User.create({
    username: 'Joelma',
    password: '123',
  }),
  User.create({
    username: 'Diogo',
    password: '123',
  }),
  User.create({
    username: 'Matheus',
    password: '123',
  }),
];

export const userMock = User.create({ username: 'Flávia', password: '123' });
