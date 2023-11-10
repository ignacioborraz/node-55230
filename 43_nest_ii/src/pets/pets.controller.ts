import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  HttpStatus,
  Query,
  Request,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';

@Controller('pets')
export class PetsController {
  constructor(private readonly petsService: PetsService) {}

  @Post()
  async create(@Body() createPetDto: CreatePetDto) {
    //analogía: let createPetDto= new CreatePetDto(req.body)
    //el decorador/módulo de body requiere req.body
    //y lo guarda en la variable createPetDto
    //con las propiedades tipadas del CreatePetDto
    try {
      if (!createPetDto.name || !createPetDto.specie) {
        throw new HttpException('Incomplete params', HttpStatus.BAD_REQUEST);
      }
      let one = await this.petsService.create(createPetDto);
      return { statusCode: 201, response: one._id };
    } catch (error) {
      let message = error.message;
      let statusCode = error.status || 500;
      throw new HttpException(message, statusCode);
    }
  }

  @Get()
  async findAll(@Query('limit') limit: number, @Query('page') page: number) {
    //analogía: let limit = req.query.limit (de tipo number)
    //el decorador/modulo de query define las consultas (opcionales)
    //y las guarda en esas variables
    //con el tipado definido
    try {
      if (!limit) limit = 5;
      if (!page) page = 1;
      let from = (page - 1) * limit;
      let to = from + Number(limit);
      let all = await this.petsService.findAll(from, to);
      if (all.length > 0) {
        return { statusCode: 200, response: all };
      }
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      let message = error.message;
      let statusCode = error.status || 500;
      throw new HttpException(message, statusCode);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    //analogía: let id = req.query.id (de tipo string)
    //el decorador/modulo de params requiere el parámetro
    //y las guarda en esa variable
    //con el tipado definido
    try {
      let one = await this.petsService.findOne(id);
      if (one) {
        return { statusCode: 200, response: one };
      }
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      let message = error.message;
      let statusCode = error.status || 500;
      throw new HttpException(message, statusCode);
    }
  }

  @Patch(':id')
  async update(@Request() req) {
    try {
      //req es el objeto de requerimientos
      //tiene la propiedad params con los params
      //tiene la propiedad query con las queries
      //tiene la propiedad body con el cuerpo
      let id: string = req.params.id;
      let updatePetDto: UpdatePetDto = req.body;
      let one = await this.petsService.update(id, updatePetDto);
      if (one) {
        return { statusCode: 200, response: one._id };
      }
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      let message = error.message;
      let statusCode = error.status || 500;
      throw new HttpException(message, statusCode);
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      let one = await this.petsService.remove(id);
      if (one) {
        return { statusCode: 200, response: one._id };
      }
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      let message = error.message;
      let statusCode = error.status || 500;
      throw new HttpException(message, statusCode);
    }
  }
}
