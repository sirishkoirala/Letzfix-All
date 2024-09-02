import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsOptional, IsString, IsEmail, IsBoolean } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsOptional()
  @IsString()
  readonly firstName?: string;

  @IsOptional()
  @IsString()
  readonly lastName?: string;

  @IsOptional()
  @IsEmail()
  readonly email?: string;

  @IsOptional()
  @IsString()
 password?: string;

  @IsOptional()
  @IsString()
  readonly invitationCode?: string;

  @IsOptional()
  readonly invitationCodeExpiresAt?: Date;

  @IsOptional()
  @IsBoolean()
  readonly isVerified?: boolean;

  @IsOptional()
  @IsBoolean()
  readonly isActive?: boolean;
}
