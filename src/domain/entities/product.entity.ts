import { CustomError } from '../errors/custom.error';


export class ProductEntity {
  constructor(
    public id: string,
    public name: string,
    public available: boolean,
    public price: number = 0,
    public description: string = '',
    public user: string,
    public category: object,
  ) {

  }

  static fromObject( object: { [ key: string ]: any; } ) {
    const { id, _id, name, available, price, description, user, category } = object;

    if ( !_id && !id ) throw CustomError.badRequest( 'Missing id' );
    const Id = _id || id;
    if ( !name || name.trim().length < 1 ) throw CustomError.badRequest( 'Missing Name' );
    if ( !user ) throw CustomError.badRequest( 'Missing User info' );
    if ( !category ) throw CustomError.badRequest( 'Missing Category info' );

    return new ProductEntity( Id, name, available, price, description,  user, category);

  }
}