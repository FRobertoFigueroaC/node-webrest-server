import { Request, response, Response } from 'express';
import { CustomError, UserRepository, RegisterUser, LoginUserDto, RegisterUserDto } from '../../domain';
import { ErrorHandler } from '../../infrastructure/helpers/errorHandler';
import { AuthService } from '../services/auth.service';

export class AuthController {

  constructor( 
    // private readonly userRepository: UserRepository
    private readonly authService: AuthService
  ){}
  /**
   * login
   */
  public login = ( req: Request, res: Response ) => {
    const [ error, loginUserDto ] = LoginUserDto.create( req.body );
    if ( error ) {
      const customError = CustomError.badRequest( error );
      return ErrorHandler.throwError( res, customError );
    }
    this.authService.loginUser( loginUserDto! )
      .then( response => res.status( 200 ).json( response ) )
      .catch( error => ErrorHandler.throwError( res, error ) );
  }

  /**
   * register
   */
  public register = (req:Request, res:Response) =>  {
    const [ error, registerUserDto ] = RegisterUserDto.create( req.body );
    
    if ( error ) {
      const customError = CustomError.badRequest( error );
      return ErrorHandler.throwError( res, customError );
    }

    this.authService.registerUser(registerUserDto!)
      .then( response => res.status( 201 ).json( response ) )
      .catch( error => ErrorHandler.throwError( res, error ) );
   
    /* new RegisterUser(this.userRepository)
      .execute( registerUserDto! )
      .then( todo => res.status( 201 ).json( todo ) )
      .catch( error => ErrorHandler.throwError( res, error )); */
    
  }
  
  /**
   * validateEmail
  */
  public validateEmail = ( req: Request, res: Response ) => {
    res.json('validateEmail');
    
  }

  /**
   * logout
   */
  public logout = ( req: Request, res: Response ) => {
    
  }
}