import { IsDate, IsNumber, IsPositive } from 'class-validator';

export class UpdateMeetingDto {
  @IsDate()
  meeting_schedule_start: Date;
  @IsPositive()
  @IsNumber()
  meeting_cap: number;
}
