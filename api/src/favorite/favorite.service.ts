import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetAllFavoriteInterface } from './INTERFACE/GetAllFavorite.interface';
import { FavoriteIdDto } from './DTO/FavoriteId.dto';
import { CreateFavoriteDto } from './DTO/CreateFavorite.dto';

@Injectable()
export class FavoriteService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllFavorite(): Promise<GetAllFavoriteInterface[]> {
    const fav = await this.prisma.favorite.findMany();

    if (!fav || fav.length === 0) {
      throw new NotFoundException('No fav found nigger');
    }

    return fav;
  }

  async createFavorite(create: CreateFavoriteDto) {
    const check = await this.prisma.favorite.findFirst({
      where: {
        user_id: create.user_id,
        meeting_id: create.meeting_id,
      },
    });

    if (check) {
      throw new Error('exists nigga boy');
    }

    await this.prisma.favorite.create({
      data: create,
    });
  }

  async deleteFavorite(id: FavoriteIdDto) {
    const check = await this.prisma.favorite.findUnique({
      where: {
        favorite_id: id.favorite_id,
      },
    });

    if (!check) {
      throw new NotFoundException('Not found lil bro');
    }

    await this.prisma.favorite.delete({
      where: {
        favorite_id: id.favorite_id,
      },
    });
  }
}
