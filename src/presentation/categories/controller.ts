import { Request, Response } from 'express';
import { CreateCategoryDto, CustomError, PaginatedResponse } from '../../domain';
import { ErrorHandler } from '../../infrastructure/helpers/errorHandler';
import { CategoryService } from '../services/category.service';
import { PaginationDto } from '../../domain/dtos/shared/pagination.dto';

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {
    
  }
  /*
  */
 public getCategories = ( req: Request, res: Response ) => {
  const {page = 1, limit= 10 } = req.query;
  const [error, paginationDto] = PaginationDto.create(Number(page), Number(limit));
   if ( error ) {
     const customError = CustomError.badRequest( error );
     return ErrorHandler.throwError( res, customError );
   }
   this.categoryService.getCategories(paginationDto!)
     .then( ( { items, total } ) => ( res.status( 200 ).json( PaginatedResponse.formatResponse( items, paginationDto!.page, paginationDto!.limit, total ) ) ))
    .catch( error => ErrorHandler.throwError( res, error ) )
  };

  /*
  */
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