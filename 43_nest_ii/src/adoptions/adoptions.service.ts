import { HttpException, Injectable } from '@nestjs/common';
import { CreateAdoptionDto } from './dto/create-adoption.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Adoption, AdoptionsDocument } from './schemas/adoptions.schema';
import { Model } from 'mongoose';

@Injectable()
export class AdoptionsService {
  constructor(
    @InjectModel(Adoption.name) private AdoptionModel: Model<AdoptionsDocument>,
  ) {}

  async create(createAdoptionDto: CreateAdoptionDto) {
    try {
      let response = await this.AdoptionModel.create(createAdoptionDto);
      return response;
    } catch (error) {
      let message = error.message;
      let statusCode = error.status || 500;
      throw new HttpException(message, statusCode);
    }
  }

  async findAll(from: number, to: number) {
    try {
      return await this.AdoptionModel.find()
        .skip(from)
        .limit(to)
        .populate('owner', '-password')
        .populate('pet');
    } catch (error) {
      let message = error.message;
      let statusCode = error.status || 500;
      throw new HttpException(message, statusCode);
    }
  }

  async findOne(id: string) {
    try {
      return await this.AdoptionModel.findById(id)
        .populate('owner', '-password')
        .populate('pet');
    } catch (error) {
      let message = error.message;
      let statusCode = error.status || 500;
      throw new HttpException(message, statusCode);
    }
  }
}
