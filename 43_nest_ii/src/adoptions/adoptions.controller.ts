import {
  Controller,
  Get,
  Post,
  Param,
  HttpException,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { AdoptionsService } from './adoptions.service';
import { CreateAdoptionDto } from './dto/create-adoption.dto';
import { randomBytes } from 'crypto';

@Controller('adoptions')
export class AdoptionsController {
  constructor(private readonly adoptionsService: AdoptionsService) {}

  @Post(':uid/:pid')
  async create(@Param('uid') uid: string, @Param('pid') pid: string) {
    try {
      let _id = randomBytes(12).toString('hex');
      let createAdoptionDto: CreateAdoptionDto = { _id, owner: uid, pet: pid };
      let one = await this.adoptionsService.create(createAdoptionDto);
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
      let all = await this.adoptionsService.findAll(from, to);
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

  @Get(':aid')
  async findOne(@Param('aid') aid: string) {
    //analogía: let id = req.query.id (de tipo string)
    //el decorador/modulo de params requiere el parámetro
    //y las guarda en esa variable
    //con el tipado definido
    try {
      let one = await this.adoptionsService.findOne(aid);
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
}
