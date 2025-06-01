import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './DTO/CreateFavorite.dto';
import { FavoriteIdDto } from './DTO/FavoriteId.dto';

@Controller('api/dev/favorite')
export class FavoriteController {
  constructor(private readonly service: FavoriteService) {}

  @Get('/all/favorite')
  getAllFavorite() {
    return this.service.getAllFavorite();
  }

  @Post('/favorite')
  createFavorite(@Body() newFav: CreateFavoriteDto) {
    return this.service.createFavorite(newFav);
  }

  @Delete('/del/fav')
  deleteFav(@Body() fav: FavoriteIdDto) {
    return this.service.deleteFavorite(fav);
  }
}
