import { Request, Response } from 'express';
import { ErrorHandler } from '../../infrastructure/helpers/errorHandler';
import { CustomError, PaginatedResponse, PaginationDto, CreateProductDto } from '../../domain';
import { ProductService } from '../services/product.service';

export class ProductController {
  constructor(private readonly productService:ProductService){}

  public getProducts = (req:Request, res:Response) => {
    const { page = 1, limit = 10 } = req.query;
    const [ error, paginationDto ] = PaginationDto.create( Number( page ), Number( limit ) );
    if ( error ) {
      const customError = CustomError.badRequest( error );
      return ErrorHandler.throwError( res, customError );
    }

    this.productService.getProducts(paginationDto!)
      .then( ( { items, total } ) => ( res.status( 200 ).json( PaginatedResponse.formatResponse( items, paginationDto!.page, paginationDto!.limit, total ) ) ) )
      .catch( error => ErrorHandler.throwError( res, error ) )

  }
  public createProduct = (req:Request, res:Response) => {
    const [ error, createProductDto ] = CreateProductDto.create( req.body );
    if ( error ) {
      const customError = CustomError.badRequest( error );
      return ErrorHandler.throwError( res, customError );
    }
    this.productService.createProduct( createProductDto!, req.body.user )
      .then( product => res.status( 201 ).json( product ) )
      .catch( error => ErrorHandler.throwError( res, error ) )
  }
}