import { Entity, EntityMetadata } from '../../../shared/core/entity';

interface UserProps {
  username: string;
  password: string;
}

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, metadata?: EntityMetadata) {
    super(props, metadata);
  }

  static create(props: UserProps, metadata?: EntityMetadata) {
    return new User(props, metadata);
  }

  get username() {
    return this.props.username;
  }

  set username(value: string) {
    this.props.username = value;
  }

  get password() {
    return this.props.password;
  }

  set password(value: string) {
    this.props.password = value;
  }
}
