
import { RegisterUserDto } from '../dtos';
import { UserEntity } from '../entities/user.entity';

export abstract class UserRepository {
  abstract create( createTodoDto: RegisterUserDto ): Promise<UserEntity>;
}