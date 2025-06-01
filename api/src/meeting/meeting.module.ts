import { Module } from '@nestjs/common';
import { MeetingInfoService } from 'src/meeting_info/meeting_info.service';

@Module({
  imports: [],
  controllers: [],
  providers: [MeetingInfoService],
})
export class MeetingModule { }
