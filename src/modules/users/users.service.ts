import { Injectable, Inject } from '@nestjs/common';
import { User } from './user.interface';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private readonly userModel: Model<User>,
  ) {}

  async findOne(username): Promise<User[]> {
    const userName = await this.userModel.find(username);
    return userName;
  }
}
