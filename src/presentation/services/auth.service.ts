import { bcryptAdapter } from '../../config/bcrypt.adapter';
import { envs } from '../../config/envs';
import { jwtAdapter } from '../../config/jwt.adapter';
import { UserModel } from '../../data/mongo';
import { CustomError, RegisterUserDto, LoginUserDto, UserEntity } from '../../domain';
import { EmailService } from './email.service';

export class AuthService {
  constructor(private readonly emailService:EmailService) {
    
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
      await this.sendEmailValidationLink(user.email);
      
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

  private sendEmailValidationLink = async (email:string) => {
    const token = await jwtAdapter.generateToken({email});
    if (!token) throw CustomError.internalServer('Error creating the token');

    const link = `${ envs.WEBSERVICE_URL }/auth/validate-email/${ token }`;

    
    const html = `
    <h1>Validate your email</h1>
    <p>Click on the following link to validate your email</p>
    <a href="${ link }">Validate your email: ${ email }</a>
    `;
    const options = {
      to: email,
      subject: 'Validate your email',
      htmlBody: html,
    }
    const isSet = await this.emailService.sendEmail( options );

    if (!isSet) throw CustomError.internalServer('Error when trying to send the email');
  }

  public  validateEmail = async (token: string) => {
    const payload = await jwtAdapter.validateToken(token);
    if(!payload) throw CustomError.unAuthorized('Invalid token');
    const { email } = payload as {email:string};

    if(!email) throw CustomError.internalServer('Token not valid for this email');

    const user = await UserModel.findOne({email});
    if (!user) throw CustomError.internalServer('User does not exist');

    user.emailValidated = true;
    await user.save();
    return true;
  }
}