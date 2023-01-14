import { Controller, Get, Post, UseGuards, Request, Body, Req } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { Public } from './auth/public.decorator';
import { User } from './users/entities/user.entity';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Public()
  @Post('auth/login')
  async login(@Request() req: { user: User }) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: { user: User }) {
    return req.user;
  }
}
