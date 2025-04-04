import { Task as TaskEntity, User as UserEntity } from '@prisma/client';
import { Task } from '../domain/task';
import { TaskDTO } from '../dtos/task.dto';
import { UserMapper } from '../../user/mappers/user-mapper';

export class TaskMapper {
  static toDomain(
    raw: TaskEntity & {
      user: UserEntity;
    },
  ): Task {
    return Task.create(
      {
        title: raw.title,
        description: raw.description,
        status: raw.status,
        user: raw.user && UserMapper.toDomain(raw.user),
      },
      {
        id: raw.id,
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
      },
    );
  }

  static toDTO(d: Task): TaskDTO {
    return {
      id: d.id as number,
      title: d.title,
      description: d.description,
      status: d.status,
      createdAt: d.createdAt,
      updatedAt: d.updatedAt,
    };
  }
}
