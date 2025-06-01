import { IsDate, IsEmail, IsString, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsString()
  first_name: string;
  @IsString()
  last_name: string;
  @IsString()
  address: string;
  @IsEmail()
  email: string;
  @IsStrongPassword()
  pass: string;
  @IsDate()
  dob: Date;
}
