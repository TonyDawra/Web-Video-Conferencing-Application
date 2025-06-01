export interface GetAllMeetingInterface {
  meeting_id: number;
  user_id: number;
  meeting_schedule_start: Date;
  meeting_cap: number;
  favorite?: {
    favorite_id: number;
    user_id: number;
  }[];
  message?: {
    user_id: number;
    message: string;
  }[];
  meeting_info?: {
    meeting_total_attendee?: number;
    meeting_end?: Date;
  };
}
