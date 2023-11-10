import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AdoptionsService } from './adoptions.service';
import { AdoptionsController } from './adoptions.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Adoption, AdoptionsSchema } from './schemas/adoptions.schema';
import IsAuth from 'src/middlewares/isAuth';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Adoption.name, schema: AdoptionsSchema },
    ]),
    ConfigModule,
    JwtModule.registerAsync({
      useFactory: () => ({ secret: process.env.SECRET }),
    }),
  ],
  controllers: [AdoptionsController],
  providers: [AdoptionsService],
})
export class AdoptionsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IsAuth)
      .forRoutes({ path: 'pets/:uid/:pid', method: RequestMethod.POST });
  }
}
