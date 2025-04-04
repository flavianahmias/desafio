import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { AuthenticateUserDTO } from '../../dtos/authenticate-user.dto';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth')
@Controller('login')
export class AuthController {
  constructor(private authService: AuthService) { }

  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  @Post()
  signIn(@Request() req, @Body() authUserDto: AuthenticateUserDTO) {
    const accessToken = this.authService.getAccessToken(req.user);
    return {
      id: req.user.id,
      username: req.user.username,
      accessToken,
    };
  }
}
