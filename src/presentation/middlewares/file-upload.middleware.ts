import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../../domain';
import { ErrorHandler } from '../../infrastructure/helpers/errorHandler';


export class FileUploadMiddleware {
  static containFiles(req:Request, res:Response, next:NextFunction){

    if ( !req.files || Object.keys( req.files ).length === 0 ) {
      const customError = CustomError.badRequest( 'Missing file' );
      return ErrorHandler.throwError( res, customError );
    }
    
    if(Array.isArray(req.files.file)){
      req.body.files = [...req.files.file];
    } else {
      req.body.files = req.files.file
    }

    next();

  }

}