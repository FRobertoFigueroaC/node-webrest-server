import { bcryptAdapter } from '../../config/bcrypt.adapter';
import { jwtAdapter } from '../../config/jwt.adapter';
import { UserModel } from '../../data/mongo';
import { CustomError, RegisterUserDto, LoginUserDto, UserEntity } from '../../domain';

export class AuthService {
  constructor() {
    
  }

  public async registerUser( registerUserDto: RegisterUserDto ) {
    const existUser = await UserModel.findOne({email:registerUserDto.email});

    if (existUser) throw CustomError.badRequest('Email already exist');

    try {
      const user = new UserModel( registerUserDto );
      // Encrypt password
      user.password = bcryptAdapter.hash( registerUserDto.password);
      await user.save();

      // JWT for user session
      const token = await jwtAdapter.generateToken({id: user.id});

      // Confirmation Email
      
      const { password, ...userEntity } = UserEntity.fromObject( user );

      return {
        user: {...userEntity},
        token: token
      }

    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async loginUser( loginUserDto: LoginUserDto ){
    // Findo one - verify user exists
    const user = await UserModel.findOne( { email: loginUserDto.email } );
    if ( !user ) throw CustomError.badRequest( 'User do not exist' );
    // the password match ?
    const isMatch = bcryptAdapter.compare( loginUserDto.password, user.password );
    if ( !isMatch ) throw CustomError.badRequest( 'Credentials do not match' );
    const { password, ...userEntity } = UserEntity.fromObject( user );
    // jwt 
    const token = await jwtAdapter.generateToken({id: userEntity.id});

    if ( !token ) throw CustomError.internalServer( 'Error when trying to create JWT');


    return {
      user: { ...userEntity },
      token: token
    }

  }
}