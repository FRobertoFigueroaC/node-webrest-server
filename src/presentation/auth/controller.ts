import { Request, Response } from 'express';

export class AuthController {

  constructor(  ) {

  }
  /**
   * login
   */
  public login( req: Request, res: Response ) {
    
    res.json('loginUser');
  }

  /**
   * register
   */
  public register(req:Request, res:Response) {
    res.json('registerUser');
    
  }
  
  /**
   * validateEmail
  */
 public validateEmail( req: Request, res: Response ) {
    res.json('validateEmail');
    
  }

  /**
   * logout
   */
  public logout( req: Request, res: Response ) {
    
  }
}