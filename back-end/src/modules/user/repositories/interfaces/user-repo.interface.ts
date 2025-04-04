import { Prisma } from '@prisma/client';
import { User } from '../../domain/user';

export interface IUserRepo {
  save(data: User): Promise<User>;
  findOne(where: Prisma.UserWhereInput): Promise<User>;

}
