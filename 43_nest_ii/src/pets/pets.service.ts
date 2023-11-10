import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { randomBytes } from 'crypto';
import { InjectModel } from '@nestjs/mongoose';
import { Pet, PetsDocument } from './schemas/pets.schema';
import { Model } from 'mongoose';

@Injectable()
export class PetsService {
  constructor(@InjectModel(Pet.name) private PetModel: Model<PetsDocument>) {}

  async create(createPetDto: CreatePetDto) {
    try {
      let response = await this.PetModel.create(createPetDto);
      return response;
    } catch (error) {
      let message = error.message;
      let statusCode = error.status || 500;
      throw new HttpException(message, statusCode);
    }
  }

  async findAll(from: number, to: number) {
    try {
      return await this.PetModel.find().skip(from).limit(to);
    } catch (error) {
      let message = error.message;
      let statusCode = error.status || 500;
      throw new HttpException(message, statusCode);
    }
  }

  async findOne(id: string) {
    try {
      return await this.PetModel.findById(id);
    } catch (error) {
      let message = error.message;
      let statusCode = error.status || 500;
      throw new HttpException(message, statusCode);
    }
  }

  async update(id: string, updatePetDto: UpdatePetDto) {
    try {
      return await this.PetModel.findByIdAndUpdate(id, updatePetDto);
    } catch (error) {
      let message = error.message;
      let statusCode = error.status || 500;
      throw new HttpException(message, statusCode);
    }
  }

  async remove(id: string) {
    try {
      return await this.PetModel.findByIdAndDelete(id);
    } catch (error) {
      let message = error.message;
      let statusCode = error.status || 500;
      throw new HttpException(message, statusCode);
    }
  }
}
