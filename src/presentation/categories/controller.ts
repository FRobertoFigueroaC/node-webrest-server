import { Request, Response } from 'express';
import { CreateCategoryDto, CustomError } from '../../domain';
import { ErrorHandler } from '../../infrastructure/helpers/errorHandler';
import { CategoryService } from '../services/category.service';

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {
    
  }
  /*
  */
  public getCategories = ( req: Request, res: Response ) => {
    this.categoryService.getCategories()
      .then( categories => res.status( 201 ).json( categories ) )
      .catch( error => ErrorHandler.throwError( res, error ) )
  };
  public createCategory = ( req: Request, res: Response ) => {
    const [error, createCategoryDto] = CreateCategoryDto.create(req.body);
    if ( error ) {
      const customError = CustomError.badRequest( error );
      return ErrorHandler.throwError( res, customError );
    }
    this.categoryService.createCategory( createCategoryDto!, req.body.user)
    .then(category => res.status(201).json(category))
    .catch(error => ErrorHandler.throwError(res,error))
  };
}