import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '../domain/task';
import { OrderBy, Sort } from '../repositories/interfaces/task-repo.interface';
import { Transform } from 'class-transformer';

export class GetTaskDTO {
  @ApiProperty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  page: number;

  @ApiProperty()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  pageSize: number;

  @ApiProperty({ required: false, enum: TaskStatus })
  @Transform(({ value }) => Number(value))
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  orderBy?: OrderBy;
  sort?: Sort;
  reqId?: number;
}
