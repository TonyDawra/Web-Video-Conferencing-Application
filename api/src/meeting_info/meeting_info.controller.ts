import { Body, Controller, Post } from '@nestjs/common';
import { MeetingInfoService } from './meeting_info.service';
import { CreateMeetingInfoDto } from './dto/CreateMeetingInfo.dto';

@Controller('api/dev/meeting_info')
export class MeetingInfoController {
  constructor(private readonly mInfo: MeetingInfoService) {}

  @Post('/create')
  createMeetingInfo(@Body() info: CreateMeetingInfoDto) {
    return this.mInfo.createMeetingInfo(info);
  }
}
