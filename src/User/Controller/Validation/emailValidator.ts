import { ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator } from 'class-validator';
import { UserRepository } from '../../../Repository/userRepository';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ async: true })
export class EmailValidator implements ValidatorConstraintInterface {

    //Verificar se existe usuario com o mesmo email
    constructor(private userRepository: UserRepository) {}

   async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
    const userExistEmail = await this.userRepository.existsWithEmail(value);
    return ! userExistEmail;
    }

}

export const UniqueEmail = (validationOptions: ValidationOptions) => {
    return (object: Object, property: string) => {
        registerDecorator({
            target: object.constructor,
            propertyName: property,
            options: validationOptions,
            constraints: [],
            validator: UniqueEmail
        })
    }
}