import { HttpException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { randomBytes } from 'crypto';

@Injectable()
export class UsersService {
  users: Array<User>
  constructor() {
    this.users = []
  }

  create(createUserDto: CreateUserDto) {
    try {
      createUserDto._id = randomBytes(12).toString("hex")
      this.users.push(createUserDto)
      return createUserDto
    } catch (error) {
      let message = error.message
      let statusCode = error.status || 500
      throw new HttpException(message, statusCode)
    }
  }
}
