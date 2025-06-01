import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetAllMeetingInterface } from './interface/GetAllMeeting.interface';
import { CreateMeetingDto } from './dto/CreateMeeting.dto';
import { MeetingResInterface } from './interface/MeetingRes.interface';
import { UpdateMeetingDto } from './dto/UpdateMeeting.dto';
import { UserIdDto } from '../users/dto/UserId.dto';

@Injectable()
export class MeetingService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllMeetings(): Promise<GetAllMeetingInterface[]> {
    const meetings = await this.prisma.meeting.findMany({
      select: {
        meeting_id: true,
        user_id: true,
        meeting_schedule_start: true,
        meeting_cap: true,
        meeting_info: {
          select: {
            meeting_total_attendee: true,
            meeting_end: true,
          },
        },
      },
    });

    if (!meetings || meetings.length === 0) {
      throw new NotFoundException('No meetings found');
    }

    return meetings;
  }

  async getMeetingById(meeting_id: number): Promise<GetAllMeetingInterface> {
    const meeting = await this.prisma.meeting.findUnique({
      where: { meeting_id: meeting_id },
      select: {
        meeting_id: true,
        user_id: true,
        meeting_schedule_start: true,
        meeting_cap: true,
        meeting_info: {
          select: {
            meeting_total_attendee: true,
            meeting_end: true,
          },
        },
      },
    });

    if (!meeting) {
      throw new NotFoundException('No meeting found');
    }

    return meeting;
  }

  async createMeeting(
    createMeetingDto: CreateMeetingDto,
  ): Promise<MeetingResInterface<any>> {
    const checkUser = await this.prisma.users.findUnique({
      where: { user_id: createMeetingDto.user_id },
    });

    if (!checkUser) {
      return {
        message: 'Meeting already exists',
      };
    }

    const meeting = await this.prisma.meeting.create({
      data: createMeetingDto,
    });

    return {
      message: 'Meeting created successfully',
      data: meeting,
    };
  }

  async updateMeeting(
    meeting_id: number,
    updateMeetingDto: UpdateMeetingDto,
    userId: UserIdDto,
  ): Promise<MeetingResInterface<any>> {
    const checkMeeting = await this.prisma.meeting.findUnique({
      where: { meeting_id: meeting_id, user_id: userId.id },
    });

    if (!checkMeeting) {
      return {
        message: 'Meeting not found',
      };
    }

    const meeting = await this.prisma.meeting.update({
      where: { meeting_id: meeting_id },
      data: updateMeetingDto,
    });

    return {
      message: 'Meeting updated successfully',
      data: meeting,
    };
  }

  async deleteMeeting(
    meeting_id: number,
    user_id: UserIdDto,
  ): Promise<MeetingResInterface<any>> {
    const checkMeeting = await this.prisma.meeting.findUnique({
      where: { meeting_id: meeting_id, user_id: user_id.id },
    });

    if (!checkMeeting) {
      return {
        message: 'Meeting not found',
      };
    }

    const meeting = await this.prisma.meeting.delete({
      where: { meeting_id: meeting_id },
    });

    return {
      message: 'Meeting deleted successfully',
      data: meeting,
    };
  }
}
