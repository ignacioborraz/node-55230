import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UsersService } from 'src/users/users.service';

@Injectable()
export default class IsValidEmail implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      let one = await this.usersService.findByEmail(req.body.email);
      if (!one) return next();
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    } catch (error) {
      console.log(error);      
      throw new HttpException(error.message, error.status);
    }
  }
}
