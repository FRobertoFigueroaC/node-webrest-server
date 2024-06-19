import { regularExps } from '../../../config/regular-exp';

export class LoginUserDto {
  private constructor(
    public readonly email: string,
    public readonly password: string,
  ) {

  }

  static create( object: { [ key: string ]: any; } ): [ string?, LoginUserDto?] {
    const { email, password } = object;
    if ( !email || email.trim().length < 1 ) return [ 'Missing email' ];
    if ( !regularExps.email.test( email ) ) return [ 'Email is not valid' ];
    if ( !password || password.trim().length < 1 ) return [ 'Missing password' ];
    if ( password.trim().length < 6 ) return [ 'Password must be at least 6 characters' ];

    return [ undefined, new LoginUserDto( email, password ) ];
  }
}