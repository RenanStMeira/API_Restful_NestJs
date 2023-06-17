import { Module } from '@nestjs/common';
import { UserModule } from './usersModule';
import { UserRepository } from '../Repository/userRepository';

@Module({
  imports: [UserModule],
  providers: [UserRepository]
})
export class AppModule {}
