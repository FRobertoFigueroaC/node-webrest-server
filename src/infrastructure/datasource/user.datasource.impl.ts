import mongoose from 'mongoose';
import { UserEntity, UserDataSource, RegisterUserDto } from '../../domain';
import { UserModel } from '../../data/mongo';

export class UserDataSourceImpl implements UserDataSource {
  async create( registerUserDto: RegisterUserDto ): Promise<UserEntity> {
    const user = new UserModel({
      name: registerUserDto.name,
      email: registerUserDto.name,
      password: registerUserDto.name,
      role: ['USER']
    });

    return UserEntity.fromObject( user );
  }


}