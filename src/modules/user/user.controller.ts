import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get('/:id')
  async getUser(@Param() id: number): Promise<UserDto> {
    const user = await this._userService.get(id);
    return user;
  }

  @Get()
  async getUsers(): Promise<UserDto[]> {
    const users = await this._userService.getAll();
    return users;
  }

  @Post()
  async createdUser(@Body() user: User): Promise<UserDto> {
    const createdUser = await this.createdUser(user);
    return createdUser;
  }

  @Patch('/:id')
  async updatedUser(@Param() id: number, @Body() user: User): Promise<UserDto> {
    const createdUser = await this.createdUser(user);
    return createdUser;
  }

  @Delete('/:id')
  async deletedUser(@Param() id: number) {
    await this._userService.delete(id);
    return true;
  }
}
