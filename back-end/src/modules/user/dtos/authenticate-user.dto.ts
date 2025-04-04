import { ApiProperty } from '@nestjs/swagger';

export class AuthenticateUserDTO {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
