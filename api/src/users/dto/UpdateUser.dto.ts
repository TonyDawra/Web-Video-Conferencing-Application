import {
  IsDate,
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  first_name: string;
  @IsString()
  @IsOptional()
  last_name: string;
  @IsString()
  @IsOptional()
  address: string;
  @IsEmail()
  @IsOptional()
  email: string;
  @IsStrongPassword()
  @IsOptional()
  pass: string;
  @IsDate()
  @IsOptional()
  dob: Date;
}
