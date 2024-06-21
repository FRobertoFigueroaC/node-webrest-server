import { CustomError } from '../errors/custom.error';


export class CategoryEntity {
  constructor(
    public id: string,
    public name: string,
    public available: boolean,
    public userId: string,
  ) {

  }

  static fromObject( object: { [ key: string ]: any; } ) {
    const { id, _id, name, available, user } = object;

    if ( !_id && !id ) throw CustomError.badRequest( 'Missing id' );
    const userId = _id || id;
    if ( !name || name.trim().length < 1 ) throw CustomError.badRequest( 'Missing Name' );
    if ( !user ) throw CustomError.badRequest( 'Missing User info' );
    
    return new CategoryEntity( userId, name, available, user );

  }
}