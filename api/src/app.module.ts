import { Module } from '@nestjs/common';
import { PrismaModule } from "./prisma/prisma.module";
import { UsersModule } from './users/users.module';
import { MeetingInfoModule } from './meeting_info/meeting_info.module';
import { FavoriteModule } from './favorite/favorite.module';
import { AttendanceModule } from './attendance/attendance.module';
import { MeetingModule } from './meeting/meeting.module';


@Module({
  imports: [PrismaModule, UsersModule, MeetingInfoModule, FavoriteModule, AttendanceModule, MeetingModule],
  providers: [],
})
export class AppModule { }
