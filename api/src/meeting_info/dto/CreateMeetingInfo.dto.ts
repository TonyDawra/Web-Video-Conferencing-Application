import { IsNumber, IsPositive, Max, Min } from 'class-validator';

export class CreateMeetingInfoDto {
  @IsPositive()
  @IsNumber()
  @Min(1)
  @Max(100)
  meeting_total_attendee: number;
  @IsPositive()
  @IsNumber()
  meeting_id: number;
}
