import { Validators } from '../../../config/validators';

export class CreateProductDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean,
    public readonly price: number,
    public readonly description: string,
    public readonly category: string,
  ) {

  }

  static create( object: { [ key: string ]: any; } ): [ string?, CreateProductDto?] {
    const { name, available = false, price, description ='', category } = object;
    let availableBoolean = available;

    if ( !name ) return [ 'Missing name' ];
    if ( typeof available !== 'boolean' ) {
      availableBoolean = ( available === 'true' );
    }
    if ( !category ) return [ 'Missing category' ];
    if ( !Validators.isMongoId(category) ) return [ 'Category is not valid'];
    
    return [ undefined, new CreateProductDto( name, availableBoolean, price, description, category ) ];
  }
}