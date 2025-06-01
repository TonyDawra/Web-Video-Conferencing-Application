import { IsNumber, IsPositive } from 'class-validator';

export class AttendanceIdDto {
  @IsPositive()
  @IsNumber()
  id: number;
}
