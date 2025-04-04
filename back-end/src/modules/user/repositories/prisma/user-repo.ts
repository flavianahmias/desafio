import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { User } from '../../domain/user';
import { UserMapper } from '../../mappers/user-mapper';
import { IUserRepo } from '../interfaces/user-repo.interface';

@Injectable()
export class UserRepoService implements IUserRepo {
  constructor(private readonly prisma: PrismaService) {}

  async findOne(where: Prisma.UserWhereInput): Promise<User> {
    const result = await this.prisma.user.findFirst({
      where: where,
    });

    if (!result) {
      throw new Error();
    }

    return UserMapper.toDomain(result);
  }

  async save(data: User): Promise<User> {
    const result = await this.prisma.user.create({
      data: {
        username: data.username,
        password: data.password,
      },
    });

    return result && UserMapper.toDomain(result);
  }
}
