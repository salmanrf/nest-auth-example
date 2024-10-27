import { CreateUserDto } from '@/users/dtos';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  create(signupDto: CreateUserDto) {
    return 'This action adds a new auth';
  }

}
