import { Request, Response } from 'express';
import { ErrorHandler } from '../../infrastructure/helpers/errorHandler';
import { CustomError, } from '../../domain';
import { FileUploadService } from '../services/file-upload.service';


export class FileUploadController {
  constructor( private readonly fileUploadService: FileUploadService ){}


  public uploadFile = (req:Request, res:Response) => {
    return res.json('single');
    // const [ error, createProductDto ] = CreateProductDto.create( req.body );
    // if ( error ) {
    //   const customError = CustomError.badRequest( error );
    //   return ErrorHandler.throwError( res, customError );
    // }
    // this.fileUploadService.createProduct( createProductDto!, req.body.user )
    //   .then( product => res.status( 201 ).json( product ) )
    //   .catch( error => ErrorHandler.throwError( res, error ) )
  }
  public uploadMultipleFile = (req:Request, res:Response) => {
    return res.json( 'multiple' );
    // const [ error, createProductDto ] = CreateProductDto.create( req.body );
    // if ( error ) {
    //   const customError = CustomError.badRequest( error );
    //   return ErrorHandler.throwError( res, customError );
    // }
    // this.fileUploadService.createProduct( createProductDto!, req.body.user )
    //   .then( product => res.status( 201 ).json( product ) )
    //   .catch( error => ErrorHandler.throwError( res, error ) )
  }
}