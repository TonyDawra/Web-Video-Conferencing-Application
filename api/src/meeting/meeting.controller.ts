import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { CreateMeetingDto } from './dto/CreateMeeting.dto';
import { UserIdDto } from '../users/dto/UserId.dto';

@Controller('api/dev/meeting')
export class MeetingController {
  constructor(private readonly meetingService: MeetingService) {}

  @Get('/all/meetings')
  getAllMeetings() {
    return this.meetingService.getAllMeetings();
  }

  @Get('/meeting/:meeting_id')
  getMeetingById(@Param('meeting_id') meeting_id: number) {
    return this.meetingService.getMeetingById(meeting_id);
  }

  @Post('/create/meeting')
  createMeeting(@Body() newMeeting: CreateMeetingDto) {
    return this.meetingService.createMeeting(newMeeting);
  }

  @Put('/update/meeting')
  updateMeeting(
    @Body() updateMeeting: CreateMeetingDto,
    @Body() meeting_id: number,
    user_id: UserIdDto,
  ) {
    return this.meetingService.updateMeeting(
      meeting_id,
      updateMeeting,
      user_id,
    );
  }

  @Delete('/delete/meeting/:meeting_id')
  deleteMeeting(@Param() meeting_id: number, user_id: UserIdDto) {
    return this.meetingService.deleteMeeting(meeting_id, user_id);
  }
}
