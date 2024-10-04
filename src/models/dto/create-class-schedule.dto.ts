import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateClassScheduleDTO {
  @IsDateString()
  date!: string;

  @IsString()
  time!: string;

  @IsNumber()
  @IsOptional()
  trainerId!: number;
}
