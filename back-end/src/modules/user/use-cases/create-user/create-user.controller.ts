import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserService } from './create-user.service';
import { CreateUserDTO } from '../../dtos/create-user.dto';
import { UserMapper } from '../../mappers/user-mapper';

@ApiTags('User')
@Controller('user')
export class CreateUserController {
    constructor(private createUserService: CreateUserService) { }
    @Post()
    async handle(@Body() body: CreateUserDTO) {
        const result = await this.createUserService.execute(body)
        return UserMapper.toDTO(result)
    }
}
