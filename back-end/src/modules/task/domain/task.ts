import { User } from 'src/modules/user/domain/user';
import { Entity, EntityMetadata } from '../../../shared/core/entity';

export enum TaskStatus {
  InProgress,
  Done,
}

interface TaskProps {
  title: string;
  description: string;
  status: number;
  user: User;
}

export class Task extends Entity<TaskProps> {
  private constructor(props: TaskProps, metadata?: EntityMetadata) {
    super(props, metadata);
  }

  static create(props: TaskProps, metadata?: EntityMetadata) {
    return new Task(props, metadata);
  }

  get title() {
    return this.props.title;
  }

  set title(value: string) {
    this.props.title = value;
  }

  get description() {
    return this.props.description;
  }

  set description(value: string) {
    this.props.description = value;
  }

  get status() {
    return this.props.status;
  }

  set status(value: number) {
    this.props.status = value;
  }

  get user() {
    return this.props.user;
  }

  set user(user: User) {
    this.props.user = user;
  }
}
