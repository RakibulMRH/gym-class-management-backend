import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDTO {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsNotEmpty()
  fullName!: string;

  @IsNotEmpty()
  role!: 'ADMIN' | 'TRAINER' | 'TRAINEE';
}
