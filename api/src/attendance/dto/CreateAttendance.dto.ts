import { IsNumber, IsPositive } from 'class-validator';

export class CreateAttendanceDto {
  @IsNumber()
  @IsPositive()
  meeting_id: number;
  @IsNumber()
  @IsPositive()
  user_id: number;
}
