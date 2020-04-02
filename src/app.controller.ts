import { Controller, Get, UseGuards, Post, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { LocalAuthGuard } from './modules/auth/local-auth.guard';
import { AuthService } from './modules/auth/auth.service';
import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
