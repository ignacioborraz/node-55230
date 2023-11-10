import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UsersSchema } from '../users/schemas/users.schema';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import IsValidEmail from 'src/middlewares/isValidEmail';
import CreateHash from 'src/middlewares/createHash';
import IsValidUser from 'src/middlewares/isValidUser';
import CreateToken from 'src/middlewares/createToken';
import IsAuth from 'src/middlewares/isAuth';
import ClearToken from 'src/middlewares/cleantoken';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UsersSchema }]),
    ConfigModule,
    JwtModule.registerAsync({
      useFactory: () => ({ secret: process.env.SECRET }),
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(IsValidEmail)
      .forRoutes({ path: 'auth/register', method: RequestMethod.POST });
    consumer
      .apply(CreateHash)
      .forRoutes({ path: 'auth/register', method: RequestMethod.POST });
    consumer
      .apply(IsValidUser)
      .forRoutes({ path: 'auth/login', method: RequestMethod.POST });
    consumer
      .apply(CreateToken)
      .forRoutes({ path: 'auth/login', method: RequestMethod.POST });
    consumer
      .apply(IsAuth)
      .forRoutes({ path: 'auth/signout', method: RequestMethod.POST });
    consumer
      .apply(ClearToken)
      .forRoutes({ path: 'auth/signout', method: RequestMethod.POST });
    consumer
      .apply(IsAuth)
      .forRoutes({ path: 'auth', method: RequestMethod.GET });
  }
}
