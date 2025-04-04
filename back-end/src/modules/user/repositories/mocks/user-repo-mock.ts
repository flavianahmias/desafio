import { Prisma } from '@prisma/client';
import { User } from '../../domain/user';
import { IUserRepo } from '../interfaces/user-repo.interface';
import { usersMock } from './user-mock';
import { NotFoundException } from '@nestjs/common';

export class UserRepoMock implements IUserRepo {
  async save(data: User): Promise<User> {
    return Promise.resolve(
      User.create({ password: data.password, username: data.username }),
    );
  }
  async findOne(where: Prisma.UserWhereInput): Promise<User> {
    let foundUser: User | undefined;

    if (where.username) {
      foundUser = usersMock.find((u) => u.username === where.username);
    } else {
      foundUser = usersMock[0];
    }

    if (!foundUser) throw new NotFoundException('User not found');

    return Promise.resolve(foundUser);
  }
}
