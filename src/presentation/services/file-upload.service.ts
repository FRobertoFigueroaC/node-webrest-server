import path from 'path'
import fs from 'fs'
import { UploadedFile } from 'express-fileupload';
import { CustomError } from '../../domain';
import { Uuid, Validators } from '../../config';


export class FileUploadService {
  constructor(private readonly uuid = Uuid.v4) {}


  // TODO: Migrate to Cloudinary

  private extensions:string[] = Validators.imageExtensions;

  private checkFolder(folder:string) {
    const destination = path.resolve( __dirname, '../../../', folder );
    if ( !fs.existsSync( destination )) {
      fs.mkdirSync( destination );
    }

    return destination;
  }


  async uploadSingleFile( 
    file:UploadedFile,
    folder: string = 'uploads',
    validExtensions: string[] = this.extensions,
    destination?: string
  ) {
    try {
      destination = destination ? destination :  this.checkFolder(folder);
      const fileExtension = file.mimetype.split('/').at(1);
      if (!Validators.isImageFile(fileExtension!)){
        throw CustomError.badRequest(`Invalid ${fileExtension}, the file must be one of the following extensions: ${validExtensions.toString()}`);
      }

      const fileName = `${this.uuid()}.${fileExtension}`;

      file.mv( `${ destination }/${ fileName}`);
      return {
        fileName
      };

    } catch ( error ) {
      throw CustomError.internalServer( `${ error }` );
    }

  }
  async uploadMultipleFile(
    files: UploadedFile[],
    folder: string = 'uploads',
    validExtensions: string[] = this.extensions
  ) {
    try {
      const destination = this.checkFolder( folder );
      const fileNames = await Promise.all(
        files.map( file => this.uploadSingleFile( file, folder, validExtensions, destination ))
      );
      
      return fileNames;
    } catch ( error ) {
      throw CustomError.internalServer( `${ error }` );
    }

  }

}