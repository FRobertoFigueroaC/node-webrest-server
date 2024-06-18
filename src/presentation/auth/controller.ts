import { Request, Response } from 'express';
import { CustomError, UserRepository, RegisterUser, RegisterUserDto } from '../../domain';
import { ErrorHandler } from '../../infrastructure/helpers/errorHandler';

export class AuthController {

  constructor( private readonly userRepository: UserRepository ) {}
  /**
   * login
   */
  public login = ( req: Request, res: Response ) => {
    res.json('loginUser');
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
   
    new RegisterUser(this.userRepository)
      .execute( registerUserDto! )
      .then( todo => res.status( 201 ).json( todo ) )
      .catch( error => {
        console.log('error', error)
        ErrorHandler.throwError( res, error )
      } )
    
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