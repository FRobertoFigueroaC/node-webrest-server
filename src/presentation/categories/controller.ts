import { Request, Response } from 'express';
import { CreateCategoryDto, CustomError } from '../../domain';
import { ErrorHandler } from '../../infrastructure/helpers/errorHandler';

export class CategoryController {
  constructor() {
    
  }
  /*
  */
  public getCategories = ( req: Request, res: Response ) => {
    res.json( 'Get categories' );
  };
  public createCategory = ( req: Request, res: Response ) => {
    const [error, createCategoryDto] = CreateCategoryDto.create(req.body);
    if ( error ) {
      const customError = CustomError.badRequest( error );
      return ErrorHandler.throwError( res, customError );
    }

    return res.json(createCategoryDto);
  };
}