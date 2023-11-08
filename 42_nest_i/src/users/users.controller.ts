import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { hashSync } from 'bcrypt';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    //analogía: let createUserDto= new CreateUserDto(req.body)
    //el decorador/módulo de body requiere req.body
    //y lo guarda en la variable createUserDto
    //con las propiedades tipadas del CreateUserDto
    try {
      if (!createUserDto.email || !createUserDto.password) {
        throw new HttpException("Incomplete params", HttpStatus.BAD_REQUEST)
      }
      createUserDto.password = hashSync(createUserDto.password,10)
      let one = this.usersService.create(createUserDto);
      return { statusCode: 201, response: one._id }
    } catch (error) {
      let message = error.message
      let statusCode = error.status || 500
      throw new HttpException(message, statusCode)
    }
  }
}
