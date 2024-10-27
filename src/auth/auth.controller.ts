import { Controller, Post, Body, } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '@/users/dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  signup(@Body() signupDto: CreateUserDto) {
    return this.authService.create(signupDto);
  }
}
