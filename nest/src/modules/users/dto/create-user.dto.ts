import { IsString, IsEmail, IsOptional, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @IsString()
  readonly firstName: string;

  @IsString()
  readonly lastName: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  readonly password: string; 

  @IsOptional()
  @IsString()
  readonly invitationCode?: string;

  @IsOptional()
  @IsBoolean()
  readonly isVerified?: boolean;

  @IsOptional()
  @IsBoolean()
  readonly isActive?: boolean;
}
