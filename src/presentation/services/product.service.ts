import { ProductModel } from '../../data/mongo';
import {  CustomError, PaginationDto, ProductEntity, UserEntity } from '../../domain';
import { CreateProductDto } from '../../domain/dtos';


export class ProductService {
  constructor() { }

  async createProduct( createProductDto: CreateProductDto, user: UserEntity ) {

    const productExists = await ProductModel.findOne( { name: createProductDto.name } );
    if ( productExists ) throw CustomError.badRequest( 'Product already exists' );

    try {

      const product = new ProductModel( {
        ...createProductDto,
        user: user.id,
      } );

      await product.save();

      return {
        id: product.id,
        name: product.name,
        available: product.available,
        price: product.price,
        description: product.description,
      };

    } catch ( error ) {
      throw CustomError.internalServer( `${error}` );
    }

  }

  async getProducts( paginationDto: PaginationDto ) {
    const { page, limit } = paginationDto;
    try {
      const [ total, products ] = await Promise.all( [
        await ProductModel.countDocuments(),
        await ProductModel.find()
          .skip( ( page - 1 ) * limit )
          .limit( limit )
      ] );

      if ( !products ) throw CustomError.badRequest( 'Products not found' );

      return {
        items: products.map( product => { return ProductEntity.fromObject( product ); } ),
        total
      };
    } catch ( error ) {
      throw CustomError.internalServer( 'Error when trying to get catagories' );
    }
  }

}