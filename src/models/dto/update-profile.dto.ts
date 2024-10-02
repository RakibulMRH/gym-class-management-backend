import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateProfileDTO {
  @IsString()
  @IsOptional()
  fullName!: string;

  @IsString()
  @IsOptional()
  password!: string;
}
