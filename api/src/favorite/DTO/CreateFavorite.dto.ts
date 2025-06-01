import { IsNumber, IsPositive } from 'class-validator';

export class CreateFavoriteDto {
  @IsPositive()
  @IsNumber()
  user_id: number;
  @IsPositive()
  @IsNumber()
  meeting_id: number;
}
