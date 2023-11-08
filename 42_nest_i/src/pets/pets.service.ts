import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './entities/pet.entity';
import { randomBytes } from 'crypto';

@Injectable()
export class PetsService {

  pets: Array<Pet>
  constructor() {
    this.pets = []
  }

  create(createPetDto: CreatePetDto) {
    try {
      createPetDto._id = randomBytes(12).toString("hex")
      this.pets.push(createPetDto)
      return createPetDto
    } catch (error) {
      let message = error.message
      let statusCode = error.status || 500
      throw new HttpException(message, statusCode)
    }
  }

  findAll(from: number, to: number) {
    try {
      return this.pets.slice(from,to)
    } catch (error) {
      let message = error.message
      let statusCode = error.status || 500
      throw new HttpException(message, statusCode)
    }
  }

  findOne(id: string) {
    try {
      let one = this.pets.find(each => each._id === id)
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

  update(id: string, updatePetDto: UpdatePetDto) {
    try {
      let one = this.pets.find(each => each._id === id)
      if (one) {
        for (let prop in updatePetDto) {
          one[prop] = updatePetDto[prop]
        }
        return one
      }
      throw new HttpException("Not found", HttpStatus.NOT_FOUND)
    } catch (error) {
      let message = error.message
      let statusCode = error.status || 500
      throw new HttpException(message, statusCode)
    }
  }

  remove(id: string) {
    try {
      let one = this.pets.find(each => each._id === id)
      if (one) {
        this.pets = this.pets.filter(each => each._id !== id)
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
