import { Module } from '@nestjs/common';
import { UserController } from '../User/Controller/userController';
import { UserRepository } from '../Repository/userRepository';
import { EmailValidator } from 'src/User/Controller/Validation/emailValidator';

@Module({
  controllers: [UserController],
  providers: [UserRepository, EmailValidator],
})
export class UserModule {}
