import { IsNumber, IsPositive } from 'class-validator';

export class FavoriteIdDto {
  @IsNumber()
  @IsPositive()
  favorite_id: number;
}
