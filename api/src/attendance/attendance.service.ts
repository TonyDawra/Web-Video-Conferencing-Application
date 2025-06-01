import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetAllAttendanceInterface } from './interface/GetAllAttendance.interface';
import { CreateAttendanceDto } from './dto/CreateAttendance.dto';

@Injectable()
export class AttendanceService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllAttendance(): Promise<GetAllAttendanceInterface[]> {
    const attendance = await this.prisma.attendance.findMany({
      select: {
        attendance_id: true,
        user_id: true,
        meeting_id: true,
        user_join: true,
        user_left: true,
      },
    });

    if (!attendance || attendance.length === 0) {
      throw new NotFoundException('No attendance found');
    }

    return attendance;
  }

  async getAttendanceById(
    attendance_id: number,
  ): Promise<GetAllAttendanceInterface> {
    const attendance = await this.prisma.attendance.findUnique({
      where: { attendance_id: attendance_id },
      select: {
        attendance_id: true,
        user_id: true,
        meeting_id: true,
        user_join: true,
        user_left: true,
      },
    });

    if (!attendance) {
      throw new NotFoundException('No attendance found');
    }

    return attendance;
  }

  async getAttendanceByMeetingId(
    meeting_id: number,
  ): Promise<GetAllAttendanceInterface[]> {
    const check = await this.prisma.meeting.findUnique({
      where: { meeting_id: meeting_id },
    });
    if (!check) {
      throw new NotFoundException('No attendance found');
    }

    const attendance = await this.prisma.attendance.findMany({
      where: { meeting_id: meeting_id },
      select: {
        attendance_id: true,
        user_id: true,
        meeting_id: true,
        user_join: true,
        user_left: true,
      },
    });

    if (!attendance || attendance.length === 0) {
      throw new NotFoundException('No attendance found');
    }

    return attendance;
  }

  async getAttendanceByUserId(user_id: number) {
    const check = await this.prisma.users.findUnique({
      where: { user_id: user_id },
    });

    if (!check) {
      throw new NotFoundException('No attendance found');
    }

    const attendance = await this.prisma.attendance.groupBy({
      by: ['meeting_id'],
      where: { user_id: user_id },
      _count: {
        attendance_id: true,
      },
      _min: {
        user_join: true,
      },
      _max: {
        user_left: true,
      },
    });

    if (!attendance || attendance.length === 0) {
      throw new NotFoundException('No attendance found');
    }

    return attendance;
  }

  async createAttendance(attendance: CreateAttendanceDto): Promise<boolean> {
    await this.checkOff(attendance.user_id, attendance.meeting_id);

    const newAttendance = await this.prisma.attendance.create({
      data: {
        meeting_id: attendance.meeting_id,
        user_id: attendance.user_id,
        user_join: new Date(),
      },
    });

    if (!newAttendance) {
      return false;
    }

    return true;
  }

  async validate(meeting_id?: number, user_id?: number): Promise<boolean> {
    if (user_id) {
      const checkUser = await this.prisma.users.findUnique({
        where: { user_id: user_id },
      });
      if (!checkUser) {
        return false;
      }
    }

    if (meeting_id) {
      const checkMeeting = await this.prisma.meeting.findUnique({
        where: { meeting_id: meeting_id },
      });
      if (!checkMeeting) {
        return false;
      }
    }

    return true;
  }

  async deleteAttendance(attendance_id: number) {
    const attendance = await this.prisma.attendance.findUnique({
      where: { attendance_id: attendance_id },
    });

    if (!attendance) {
      throw new NotFoundException('No attendance found');
    }

    await this.prisma.attendance.delete({
      where: { attendance_id: attendance_id },
    });
  }

  async checkOff(user_id: number, meeting_id: number) {
    if (!(await this.validate(meeting_id, user_id))) {
      throw new NotFoundException('No attendance found');
    }

    const attendanceRecord = await this.prisma.attendance.findFirst({
      where: {
        meeting_id: meeting_id,
        user_id: user_id,
        user_left: null,
      },
    });

    if (!attendanceRecord) {
      throw new NotFoundException('Attendance record not found');
    }
    await this.prisma.attendance.update({
      where: {
        attendance_id: attendanceRecord.attendance_id,
      },
      data: {
        user_left: new Date(),
      },
    });
  }
}
