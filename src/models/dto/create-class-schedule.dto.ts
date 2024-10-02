import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateClassScheduleDTO {
  @IsDateString()
  date!: string;

  @IsString()
  time!: string;

  @IsNumber()
  trainerId!: number;
}
