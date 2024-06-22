import { Response, Request, NextFunction } from 'express';
import { CustomError } from '../../domain';
import { ErrorHandler } from '../../infrastructure/helpers/errorHandler';

export class TypeMiddleware {
  static validTypes(validTypes:string[]){
    return ( req: Request, res: Response, next: NextFunction ) => {
      const type = req.url.split('/').at(2) ?? '';
      if (!validTypes.includes(type)) {
        const error = CustomError.badRequest( `Type: ${ type} is not valid`);
        return ErrorHandler.throwError( res, error );
      }
      next();
    }
  }
}