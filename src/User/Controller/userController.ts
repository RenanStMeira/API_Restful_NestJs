import { Controller, Post, Body, Get, Put, Param, Delete } from '@nestjs/common';
import { UserRepository } from '../../Repository/userRepository';
import { CreateUserDto } from './dto/createUserDto';
import { UserEntity } from './userEtity';
import { v4 as uuid } from 'uuid';
import { UpdateUserDto } from './dto/updateUserDto';

@Controller('/users')
export class UserController {

  constructor(private userRepository: UserRepository) {}

  @Post()
  async createUser(@Body() userData: CreateUserDto) {
    const userEntity = new UserEntity()
    userEntity.email = userData.email;
    userEntity.password = userData.password;
    userEntity.name = userData.name;
    userEntity.id = uuid();

    this.userRepository.toSave(userEntity);
    return { id: userEntity.id, message: 'User created successfully' }
  }

  @Get()
  async listUsers() {
    return this.userRepository.list();
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() dataToUpdate: UpdateUserDto) {
    const usuarioAtualizado = await this.userRepository.update(id, dataToUpdate);

    return {
      users: usuarioAtualizado,
      message: 'User updated successfully'
    };
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const deletedUser = await this.userRepository.deleteUser(id);

    return {
      user: deletedUser,
      message: 'User removed successfully'
    };
  }
}
