import { UserEntity } from '../entities/user.entity';
import { RegisterUserDto } from '../dtos';


export abstract class UserDataSource {
  abstract create( registerUserDto: RegisterUserDto ): Promise<UserEntity>;
}