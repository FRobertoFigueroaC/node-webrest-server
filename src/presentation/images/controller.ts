import fs from 'fs';
import path from 'path';
import { Request, Response } from 'express';
import { CustomError } from '../../domain';
import { ErrorHandler } from '../../infrastructure/helpers/errorHandler';

export class ImageController{
  constructor(){}

  public getImage = (req:Request, res:Response) => {

    const {type = '', img =  ''} = req.params;

    const imagePath = path.resolve(__dirname, `../../../uploads/${type}/${img}`);

    if (!fs.existsSync(imagePath)) {
      const error = CustomError.notFound('The file does not exist');
      return ErrorHandler.throwError( res, error );
    }


    return res.sendFile(imagePath);

  }
}