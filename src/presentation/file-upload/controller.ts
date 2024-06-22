import { Request, Response } from 'express';
import { ErrorHandler } from '../../infrastructure/helpers/errorHandler';
import { FileUploadService } from '../services/file-upload.service';
import { UploadedFile } from 'express-fileupload';


export class FileUploadController {
  constructor( private readonly fileUploadService: FileUploadService ){}

  public uploadFile = (req:Request, res:Response) => {
    const type = req.params.type;
    const file = req.body.files as UploadedFile;

    this.fileUploadService.uploadSingleFile( file, `uploads/${type}` )
      .then( response => res.status( 201 ).json( response ) )
      .catch( error => ErrorHandler.throwError( res, error ) )
  }

  public uploadMultipleFile = (req:Request, res:Response) => {
    const type = req.params.type;
    const files = req.body.files as UploadedFile[];

    this.fileUploadService.uploadMultipleFile( files, `uploads/${ type }` )
      .then( response => res.status( 201 ).json( response ) )
      .catch( error => ErrorHandler.throwError( res, error ) )
  }
}