import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMeetingInfoDto } from './dto/CreateMeetingInfo.dto';
import { MeetingInfoResInterface } from './interface/MeetingInfoRes.interface';

@Injectable()
export class MeetingInfoService {
  constructor(private readonly prisma: PrismaService) {}

  async createMeetingInfo(
    info: CreateMeetingInfoDto,
  ): Promise<MeetingInfoResInterface<any>> {
    const checkMeeting = await this.prisma.meeting.findUnique({
      where: { meeting_id: info.meeting_id },
    });

    const checkMeetingInfo = await this.prisma.meeting_info.findUnique({
      where: { meeting_id: info.meeting_id },
    });

    if (!checkMeeting) {
      return {
        message: 'Meeting not found',
        data: null,
      };
    }

    if (checkMeetingInfo) {
      return {
        message: 'Meeting info already exists',
        data: null,
      };
    }

    const meetingInfo = await this.prisma.meeting_info.create({
      data: info,
    });

    return {
      message: 'Meeting info created',
      data: meetingInfo,
    };
  }
}
