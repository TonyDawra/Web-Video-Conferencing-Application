import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AttendanceService } from './attendance.service';
import { CreateAttendanceDto } from './dto/CreateAttendance.dto';
import { AttendanceIdDto } from './dto/AttendanceId.dto';
import { UserIdDto } from '../users/dto/UserId.dto';

@Controller('api/dev/attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Get('/all/attendance')
  getAllAttendance() {
    return this.attendanceService.getAllAttendance();
  }

  @Get('/attendance/:attendance_id')
  getAttendanceById(@Param('attendance_id') attendance_id: number) {
    return this.attendanceService.getAttendanceById(attendance_id);
  }

  @Get('/attendance/meeting/:meeting_id')
  getAttendanceByMeetingId(@Param('meeting_id') meeting_id: number) {
    return this.attendanceService.getAttendanceByMeetingId(meeting_id);
  }

  @Post('/create/attendance')
  createAttendance(@Body() newAttendance: CreateAttendanceDto) {
    return this.attendanceService.createAttendance(newAttendance);
  }

  @Put('/update/attendance')
  updateAttendance(
    @Body() updateAttendance: CreateAttendanceDto,
    @Body() attendance_id: AttendanceIdDto,
  ) {
    return this.attendanceService.checkOff(
      attendance_id.id,
      updateAttendance.meeting_id,
    );
  }

  @Get('/attendance/user/:user_id')
  getAttendanceByUserId(@Body() user_id: UserIdDto) {
    return this.attendanceService.getAttendanceByUserId(user_id.id);
  }

  @Delete('/delete/attendance/:attendance_id')
  deleteAttendance(@Param() attendance_id: AttendanceIdDto) {
    return this.attendanceService.deleteAttendance(attendance_id.id);
  }
}
