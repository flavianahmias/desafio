import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { IUserRepo } from '../../repositories/interfaces/user-repo.interface';

@Injectable()
export class AuthService {
  constructor(
    @Inject('IUserRepo') private readonly userRepo: IUserRepo,
    private jwtService: JwtService,
  ) { }

  async validateUser(username: string, password: string) {
    const user = await this.userRepo.findOne({ username: { equals: username } });

    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return null;

    return user;
  }

  getAccessToken(user: any): string {
    const payload = {
      id: user.id,
      username: user.username,
    };
    return this.jwtService.sign(payload);
  }
}
