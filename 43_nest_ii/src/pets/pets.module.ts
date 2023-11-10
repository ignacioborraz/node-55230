import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pet, PetsSchema } from './schemas/pets.schema';
import IsAuth from 'src/middlewares/isAuth';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Pet.name, schema: PetsSchema }]),
    ConfigModule,
    JwtModule.registerAsync({
      useFactory: () => ({ secret: process.env.SECRET }),
    }),
  ],
  controllers: [PetsController],
  providers: [PetsService],
})
export class PetsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IsAuth)
      .exclude(
        { path: 'pets', method: RequestMethod.GET },
        { path: 'pets/:id', method: RequestMethod.GET },
      )
      .forRoutes(PetsController);
  }
}
