import { regularExps } from '../../../config';

export class RegisterUserDto {
  private constructor(
    public readonly name: string,
    public readonly email: string,
    public readonly password: string,
  ) {
    
  }

  static create(object:{[key:string]: any}): [string?, RegisterUserDto?]{
    const { name, email, password } = object;
    if ( !name || name.trim().length < 1 ) return ['Missing name'];
    if ( !email || email.trim().length < 1 ) return ['Missing email'];
    if (!regularExps.email.test(email)) return ['Email is not valid'];
    if ( !password || password.trim().length < 1 ) return ['Missing password'];
    if ( password.trim().length < 6 ) return ['Password must be at least 6 characters'];

    return [undefined, new RegisterUserDto(name, email, password)];
  }
}