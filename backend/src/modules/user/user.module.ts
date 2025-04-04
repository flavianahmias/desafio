import { Module } from '@nestjs/common';
import { AuthService } from './use-cases/auth/auth.service';
import { AuthController } from './use-cases/auth/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './use-cases/auth/jwt.strategy';
import { LocalStrategy } from './use-cases/auth/local.strategy';
import { CreateUserController } from './use-cases/create-user/create-user.controller';
import { CreateUserService } from './use-cases/create-user/create-user.service';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { UserRepoService } from './repositories/prisma/user-repo';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    PrismaModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '8h',
      },
    }),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    CreateUserService,
    UserRepoService,
    { provide: 'IUserRepo', useExisting: UserRepoService },
  ],
  controllers: [AuthController, CreateUserController],
})
export class UserModule {}
