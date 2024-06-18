import { RegisterUserDto } from '../../dtos';
import { UserEntity } from '../../entities/user.entity';
import { UserRepository } from '../../repositories/user.repository';

export interface RegisterUserUseCase {
  execute( dto: RegisterUserDto ): Promise<UserEntity>;
}

export class RegisterUser implements RegisterUserUseCase {
  constructor( private readonly repository: UserRepository ) {

  }
  execute( dto: RegisterUserDto ): Promise<UserEntity> {
    return this.repository.create( dto );
  }
}