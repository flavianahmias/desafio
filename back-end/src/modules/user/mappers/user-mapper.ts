import { User as UserEntity } from '@prisma/client';
import { User } from '../domain/user';
import { UserDTO } from '../dtos/user.dto';

export class UserMapper {
  static toDomain(raw: UserEntity): User {
    return User.create(
      {
        username: raw.username,
        password: raw.password,
      },
      {
        id: raw.id,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
    );
  }

  static toDTO(d: User): UserDTO {
    return {
      id: d.id as number,
      username: d.username,
      createdAt: d.createdAt,
      updatedAt: d.updatedAt,
    };
  }
}
