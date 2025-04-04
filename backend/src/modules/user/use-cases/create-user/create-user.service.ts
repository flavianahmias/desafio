import { Inject, Injectable } from '@nestjs/common';
import { IUserRepo } from '../../repositories/interfaces/user-repo.interface';
import { CreateUserDTO } from '../../dtos/create-user.dto';
import { User } from '../../domain/user';
import { UseCase } from 'src/shared/core/use-case';

import * as bcrypt from 'bcrypt';

type Input = CreateUserDTO

type Result = User

@Injectable()
export class CreateUserService implements UseCase<Input, Result> {
    constructor(@Inject('IUserRepo') private readonly userRepo: IUserRepo) { }
    async execute(input: Input): Promise<Result> {
        const saltOrRounds = 10;
        const hash = await bcrypt.hash(input.password, saltOrRounds);
        const user = await this.userRepo.save(User.create({
            password: hash,
            username: input.username
        }))
        return user
    }
}
