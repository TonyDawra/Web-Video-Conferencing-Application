import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UserIdDto } from './dto/UserId.dto';

@Controller('api/dev/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('/all/users')
  getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('/user/:user_id')
  getUserById(@Param('user_id') user_id: number) {
    return this.usersService.getUserById(user_id);
  }

  @Post('/create/user')
  createUser(@Body() newUser: CreateUserDto) {
    return this.usersService.createUser(newUser);
  }

  @Put('/update/user')
  updateUser(@Body() updateUser: CreateUserDto, @Body() user_id: UserIdDto) {
    return this.usersService.updateUser(user_id.id, updateUser);
  }

  @Delete('/delete/user/:user_id')
  deleteUser(@Param() user_id: UserIdDto) {
    return this.usersService.deleteUser(user_id.id);
  }
}
