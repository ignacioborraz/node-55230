import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAdoptionDto } from './dto/create-adoption.dto';
import { Adoption } from './entities/adoption.entity';
import { randomBytes } from 'crypto';

@Injectable()
export class AdoptionsService {
  adoptions: Array<Adoption>
  constructor() {
    this.adoptions = []
  }

  create(createAdoptionDto: CreateAdoptionDto) {
    try {
      createAdoptionDto._id = randomBytes(12).toString("hex")
      this.adoptions.push(createAdoptionDto)
      return createAdoptionDto
    } catch (error) {
      let message = error.message
      let statusCode = error.status || 500
      throw new HttpException(message, statusCode)
    }
  }

  findAll(from: number, to: number) {
    try {
      return this.adoptions.slice(from,to)
    } catch (error) {
      let message = error.message
      let statusCode = error.status || 500
      throw new HttpException(message, statusCode)
    }
  }

  findOne(id: string) {
    try {
      let one = this.adoptions.find(each => each._id === id)
      if (one) {
        return one
      }
      throw new HttpException("Not found", HttpStatus.NOT_FOUND)
    } catch (error) {
      let message = error.message
      let statusCode = error.status || 500
      throw new HttpException(message, statusCode)
    }
  }
}
