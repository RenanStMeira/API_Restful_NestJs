import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { UniqueEmail } from '../Validation/emailValidator';

//Validação
export class CreateUserDto {
    @IsNotEmpty({ message: 'Name cannot be empty' })
    name: string;

    @IsEmail({}, { message: 'Email invalid' })
    @UniqueEmail({ message: 'Email already exists' })
    email: string;

    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;
}
