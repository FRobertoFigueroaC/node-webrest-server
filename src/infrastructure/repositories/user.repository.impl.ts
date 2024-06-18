import { RegisterUserDto, UserEntity, UserRepository, UserDataSource } from '../../domain';

export class UserRepositoryImpl implements UserRepository {

  constructor(
    private readonly datasource: UserDataSource
  ) {

  }
  create( registerUserDto: RegisterUserDto ): Promise<UserEntity> {
    return this.datasource.create( registerUserDto );
  }
}