import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Get,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    try {
      if (!createUserDto.email || !createUserDto.password) {
        throw new HttpException('Incomplete params', HttpStatus.BAD_REQUEST);
      }
      let one = await this.usersService.create(createUserDto);
      return { statusCode: 201, response: one._id };
    } catch (error) {
      let message = error.message;
      let statusCode = error.status || 500;
      throw new HttpException(message, statusCode);
    }
  }
  @Post('login')
  login() {
    try {
      return { statusCode: 200, response: 'User logged in' };
    } catch (error) {
      let message = error.message;
      let statusCode = error.status || 500;
      throw new HttpException(message, statusCode);
    }
  }
  @Post('signout')
  signout() {
    try {
      return { statusCode: 200, response: 'User signed out' };
    } catch (error) {
      let message = error.message;
      let statusCode = error.status || 500;
      throw new HttpException(message, statusCode);
    }
  }
  @Get()
  async findByEmail(@Request() req) {
    try {
      let one = await this.usersService.findByEmail(req.body.email);
      delete one.password;
      return { statusCode: 200, response: one };
    } catch (error) {
      let message = error.message;
      let statusCode = error.status || 500;
      throw new HttpException(message, statusCode);
    }
  }
}
