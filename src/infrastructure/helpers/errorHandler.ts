import { Request, Response } from 'express';
import { CustomError } from '../../domain';


export class ErrorHandler {


  static throwError ( res: Response, error: unknown ) {
    if ( error instanceof CustomError ) {
      return res.status( error.statusCode ).json( { error: error.message } );
    }
    return res.status( 500 ).json( { error: 'Internal server error - check logs' } );
  };
}