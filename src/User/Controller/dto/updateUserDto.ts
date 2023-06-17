import { IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';
import { UniqueEmail } from '../Validation/emailValidator';

//Validação
export class UpdateUserDto {
    @IsNotEmpty({ message: 'Name cannot be empty' })
    @IsOptional()
    name: string;

    @IsEmail({}, { message: 'Email invalid' })
    @UniqueEmail({ message: 'Email already exists' })
    @IsOptional()
    email: string;

    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    @IsOptional()
    password: string;
}
