import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetAllUsersInterface } from './interface/GetAllUsers.interface';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UserResInterface } from './interface/UserRes.interface';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllUsers(): Promise<GetAllUsersInterface[]> {
    const users = await this.prisma.users.findMany({
      select: {
        user_id: true,
        email: true,
        first_name: true,
        last_name: true,
        address: true,
        dob: true,
        creation: true,
      },
    });

    if (!users || users.length === 0) {
      throw new NotFoundException('No users found');
    }

    return users;
  }

  async getUserById(user_id: number): Promise<GetAllUsersInterface> {
    const user = await this.prisma.users.findUnique({
      where: { user_id: user_id },
      select: {
        user_id: true,
        email: true,
        first_name: true,
        last_name: true,
        address: true,
        dob: true,
        creation: true,
      },
    });

    if (!user) {
      throw new NotFoundException('No user found');
    }

    return user;
  }

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<UserResInterface<any>> {
    const checkUser = await this.prisma.users.findUnique({
      where: { email: createUserDto.email },
    });

    if (checkUser) {
      return {
        message: 'Email already exists',
      };
    }

    const user = await this.prisma.users.create({
      data: {
        first_name: createUserDto.first_name,
        last_name: createUserDto.last_name,
        address: createUserDto.address,
        email: createUserDto.email,
        pass: createUserDto.pass,
        dob: createUserDto.dob,
      },
    });

    return {
      message: 'User created successfully',
      data: user,
    };
  }

  async updateUser(
    user_id: number,
    createUserDto: CreateUserDto,
  ): Promise<UserResInterface<any>> {
    const checkUser = await this.prisma.users.findUnique({
      where: { user_id: user_id },
    });

    if (!checkUser) {
      return {
        message: 'User not found',
      };
    }

    const user = await this.prisma.users.update({
      where: { user_id: user_id },
      data: {
        first_name: createUserDto.first_name,
        last_name: createUserDto.last_name,
        address: createUserDto.address,
        email: createUserDto.email,
        pass: createUserDto.pass,
        dob: createUserDto.dob,
      },
    });

    return {
      message: 'User updated successfully',
      data: user,
    };
  }

  async deleteUser(user_id: number): Promise<UserResInterface<any>> {
    const user = await this.prisma.users.findUnique({
      where: { user_id: user_id },
    });

    if (!user) {
      return {
        message: 'User not found',
      };

      const deletedUser = await this.prisma.users.delete({
        where: { user_id: user_id },
      });

      return {
        message: 'User deleted successfully',
        data: deletedUser,
      };
    }
  }
}
