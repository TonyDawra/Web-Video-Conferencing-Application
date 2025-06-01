export interface GetAllUsersInterface {
  user_id: number;
  first_name: string;
  last_name: string;
  address: string;
  email: string;
  pass?: string;
  dob: Date;
  creation: Date;
  attendance?: {
    attendance_id: number;
  }[];
  favorite?: {
    favorite_id: number;
  }[];
  message?: {
    message_id: number;
  }[];
}
