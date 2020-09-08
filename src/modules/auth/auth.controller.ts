import { Controller, Body, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { UserDto } from '../users/dto/user.dto';
import { DoesUserExist } from '../../core/guards/doesUserExist.guard';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOkResponse({ type: AuthDto })
  @UseGuards(AuthGuard('local'))
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Post('signup')
  @ApiOkResponse({ type: AuthDto })
  @UseGuards(DoesUserExist)
  async signUp(@Body() user: UserDto) {
    return await this.authService.create(user);
  }
}
