import { IsDate, IsNumber, IsPositive } from 'class-validator';

export class CreateMeetingDto {
  @IsPositive()
  @IsNumber()
  user_id: number;
  @IsDate()
  meeting_schedule_start: Date;
  @IsPositive()
  @IsNumber()
  meeting_cap: number;
}
